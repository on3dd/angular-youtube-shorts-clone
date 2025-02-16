import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RedditListingObj, RedditPostData, RedditPostObj } from 'src/app/shared/types/reddit.types';

export const PAGE_SIZE = 10;

const BASE_URL = 'https://www.reddit.com/r/TikTokCringe';

@Injectable()
export class ClipsApiService {
  private readonly http = inject(HttpClient);

  getInitialPost(name?: RedditPostData['name']): Observable<RedditPostObj> {
    return name ? this.getPostById(name) : this.getFirstPost();
  }

  getFirstPost(): Observable<RedditPostObj> {
    return (
      this.http
        .get<RedditListingObj<RedditPostObj>>(`${BASE_URL}/hot.json`, {
          params: { limit: 1 },
          responseType: 'json',
        })
        // Get last post in the list because Reddit API can put subreddit's pinned posts in front of the actual response
        .pipe(map((response) => response.data.children.at(-1) as RedditPostObj))
    );
  }

  getPostById(id: RedditPostData['id']): Observable<RedditPostObj> {
    return this.http
      .get<
        RedditListingObj<RedditPostObj>[]
      >(`${BASE_URL}/comments/${id}.json`, { params: { limit: 1 }, responseType: 'json' })
      .pipe(map((response) => response[0].data.children[0]));
  }

  getPosts(after?: RedditPostData['name'] | null, count?: number): Observable<RedditPostObj[]> {
    const params = this.buildHttpParams({ after, count, limit: PAGE_SIZE });

    return this.http
      .get<RedditListingObj<RedditPostObj>>(`${BASE_URL}/hot.json`, { params, responseType: 'json' })
      .pipe(map((response) => this.filterPostsWithMedia(response.data.children)));
  }

  private buildHttpParams(params: Record<string, unknown>): HttpParams {
    return Object.entries(params).reduce(
      (acc, [key, value]) => (value ? acc.set(key, value.toString()) : acc),
      new HttpParams(),
    );
  }

  private filterPostsWithMedia(posts: RedditPostObj[]): RedditPostObj[] {
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
        // Filter out posts without media.
        .filter((post) => post?.data.secure_media?.reddit_video)
    );
  }
}
