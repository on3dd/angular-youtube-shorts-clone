import { computed, effect, Injectable, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { delay, map, of, scan } from 'rxjs';
import { RedditPostObj } from 'src/app/shared/types/reddit.types';

import { MOCK_API_RESPONSE } from '../clip/utils/constants';

const PAGE_SIZE = 5;

const mockApiRequest = (page: number) => {
  const offset = page * PAGE_SIZE;
  return of(MOCK_API_RESPONSE.data.children.slice(offset, offset + PAGE_SIZE)).pipe(delay(1000));
};

@Injectable()
export class ClipsService {
  private readonly _activeItemIdx = signal<number>(0);
  readonly activeItemIdx = this._activeItemIdx.asReadonly();

  private readonly _activePageIdx$ = toObservable(this.activeItemIdx).pipe(
    map((idx) => Math.floor((idx + 1) / (PAGE_SIZE - 1))),
    scan((prev, curr) => (curr > prev ? curr : prev), 0),
  );

  /** Number of the last loaded page.  */
  private readonly activePageIdx = toSignal(this._activePageIdx$);

  private readonly clipsResourse = rxResource({
    request: this.activePageIdx,
    loader: ({ request }) => mockApiRequest(request),
  });

  private readonly _clipsList = computed(
    () => this.clipsResourse.value()?.filter((clip) => clip.data?.media?.reddit_video) ?? [],
  );

  private readonly _totalClipsList$ = toObservable(this._clipsList).pipe(
    scan((prev, curr) => prev.concat(curr), [] as RedditPostObj[]),
  );

  /** Total list of the loaded items. */
  readonly totalClipsList = toSignal(this._totalClipsList$, { initialValue: [] });

  readonly activeItem = computed(() => {
    return this.totalClipsList()[this.activeItemIdx()];
  });

  // TODO: remove after testing
  constructor() {
    effect(() => console.log(`idx: ${this.activeItemIdx()}, page: ${this.activePageIdx()}`));
  }

  prevItem() {
    this._activeItemIdx.update((value) => Math.max(0, value - 1));
  }

  nextItem() {
    this._activeItemIdx.update((value) => Math.min(value + 1, this.totalClipsList().length - 1));
  }
}
