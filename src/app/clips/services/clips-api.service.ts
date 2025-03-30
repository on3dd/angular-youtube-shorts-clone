import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RedditListingObj, RedditPostData, RedditPostObj } from 'src/app/shared/types/reddit.types';

// TODO: provide this via DI token + update tests then
export const PAGE_SIZE = 10;

// TODO: provide this via DI token
export const BASE_URL = 'https://www.reddit.com/r/TikTokCringe';

@Injectable()
export class ClipsApiService {
  private readonly http = inject(HttpClient);

  getInitialPost(id?: RedditPostData['id']): Observable<RedditPostData> {
    const source = id ? this.getPostById(id) : this.getFirstPost();

    return source.pipe(map((post) => this.filterPostsWithMedia(post)[0]));
  }

  getFirstPost(): Observable<RedditPostObj> {
    return (
      this.http
        .get<RedditListingObj<RedditPostObj>>(`${BASE_URL}/hot.json`, {
          params: { limit: 1 },
          responseType: 'json',
        })
        // Get last post in the list because Reddit API can put subreddit's pinned posts in front of the actual response
        .pipe(map((response) => response.data.children.at(-1)!))
    );
  }

  getPostById(id: RedditPostData['id']): Observable<RedditPostObj> {
    return this.http
      .get<RedditListingObj<RedditPostObj>[]>(`${BASE_URL}/comments/${id}.json`, {
        params: { limit: 1 },
        responseType: 'json',
      })
      .pipe(map((response) => response[0].data.children[0]));
  }

  getPosts(after?: RedditPostData['name'] | null, count?: number): Observable<RedditPostData[]> {
    const params = this.buildHttpParams({ after, count, limit: PAGE_SIZE });

    return this.http
      .get<RedditListingObj<RedditPostObj>>(`${BASE_URL}/hot.json`, {
        params,
        responseType: 'json',
      })
      .pipe(map((response) => this.filterPostsWithMedia(...response.data.children)));
  }

  private buildHttpParams(params: Record<string, unknown>): HttpParams {
    return Object.entries(params).reduce(
      (acc, [key, value]) => (value ? acc.set(key, value.toString()) : acc),
      new HttpParams(),
    );
  }

  private filterPostsWithMedia(...posts: RedditPostObj[]): RedditPostData[] {
    return (
      posts
        // Handle cases when post itself doesn't have a video, but has crossposts.
        .map((post) => {
          if (!post.data?.secure_media?.reddit_video && post.data?.crosspost_parent_list) {
            const crossPostWithMedia = post.data?.crosspost_parent_list.find(
              (crossPost) => crossPost.secure_media?.reddit_video,
            );

            if (crossPostWithMedia) {
              post.data.secure_media = crossPostWithMedia.secure_media;
            }
          }

          return post;
        })
        .map((post) => post.data)
        // Filter out posts without media.
        .filter((post) => post.secure_media?.reddit_video)
    );
  }
}
