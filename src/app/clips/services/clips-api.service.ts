import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

import { MOCK_API_RESPONSE } from '../shared/mock-data';

export const PAGE_SIZE = 5;

@Injectable({ providedIn: 'root' })
export class ClipsApiService {
  getPosts(page: number) {
    const offset = page * PAGE_SIZE;
    const data = MOCK_API_RESPONSE.data.children.slice(offset, offset + PAGE_SIZE);
    return of(data).pipe(delay(1000));
  }
}
