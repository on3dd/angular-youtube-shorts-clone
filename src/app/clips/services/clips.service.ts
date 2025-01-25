import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, scan } from 'rxjs';
import { RedditPostObj } from 'src/app/shared/types/reddit.types';

import { ClipsApiService, PAGE_SIZE } from './clips-api.service';

@Injectable({ providedIn: 'root' })
export class ClipsService {
  private readonly clipsApiService = inject(ClipsApiService);

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
    loader: ({ request }) => this.clipsApiService.getPosts(request),
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
