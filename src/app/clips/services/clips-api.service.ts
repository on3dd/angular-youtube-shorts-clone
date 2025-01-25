import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RedditListingObj, RedditPostData, RedditPostObj } from 'src/app/shared/types/reddit.types';

export const PAGE_SIZE = 10;

const BASE_URL = 'https://www.reddit.com/r/TikTokCringe/hot.json';

@Injectable({ providedIn: 'root' })
export class ClipsApiService {
  private readonly http = inject(HttpClient);

  getPosts(after?: RedditPostData['name'] | null): Observable<RedditPostObj[]> {
    const params = this.buildHttpParams({ after, limit: PAGE_SIZE });

    return this.http
      .get<RedditListingObj<RedditPostObj>>(BASE_URL, { params, responseType: 'json' })
      .pipe(map((response) => response.data.children));
  }

  private buildHttpParams(params: Record<string, any>): HttpParams {
    return Object.entries(params).reduce((acc, [key, value]) => (value ? acc.set(key, value) : acc), new HttpParams());
  }
}
