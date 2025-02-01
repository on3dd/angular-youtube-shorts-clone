import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { derivedFrom } from 'ngxtension/derived-from';
import { map, pipe, scan } from 'rxjs';
import { RedditPostObj } from 'src/app/shared/types/reddit.types';

import { ClipsApiService, PAGE_SIZE } from './clips-api.service';

@Injectable({ providedIn: 'root' })
export class ClipsService {
  private readonly route = inject(ActivatedRoute);
  private readonly clipsApiService = inject(ClipsApiService);

  /** Index of the active item. */
  private readonly _activeItemIdx = signal<number>(0);
  readonly activeItemIdx = this._activeItemIdx.asReadonly();

  /** Index of the last loaded page. */
  private readonly _activePageIdx = derivedFrom(
    [this._activeItemIdx],
    pipe(
      map(([itemIdx]) => Math.floor((itemIdx + 1) / PAGE_SIZE)),
      scan((prev, curr) => (curr > prev ? curr : prev), 0),
    ),
    { initialValue: 0 },
  );

  /** Name of item to pass to the next page request. */
  private readonly _afterItemName: Signal<string | null> = computed(() => {
    const pageIdx = this._activePageIdx();
    const clips = this.totalClipsList();

    if (pageIdx > 0 && clips.length > 0) {
      return clips[pageIdx * PAGE_SIZE - 1]?.data.name;
    }

    console.log('route snapshot child id', this.route.snapshot.children[0].params['id']);

    // return this.route.snapshot.children[0]?.params['id'] ?? null;
    return null;
  });

  /** Resourse that loads the next page of posts and updates when `afterItemName` changes. */
  private readonly _clipsResourse = rxResource({
    request: this._afterItemName,
    loader: ({ request }) => this.clipsApiService.getPosts(request),
  });

  // private readonly _clipsList = computed(() => {
  //   return this.clipsResourse.value() ?? [];
  // });

  /** Total list of all loaded clips. */
  readonly totalClipsList = derivedFrom(
    // [this._clipsList],
    [this._clipsResourse.value],
    pipe(
      map(([posts]) => posts ?? []),
      scan((prev, curr) => prev.concat(curr), [] as RedditPostObj[]),
    ),
    { initialValue: [] },
  );

  /** Active clip to display in UI. Quite obvious. */
  readonly activeItem = computed(() => this.totalClipsList()[this.activeItemIdx()]);

  // TODO: remove after testing
  constructor() {
    effect(() => {
      console.group();
      console.log('activeIdx:', this.activeItemIdx());
      console.log('_afterItemName:', this._afterItemName());
      console.groupEnd();
    });
  }

  prevItem() {
    this._activeItemIdx.update((value) => Math.max(0, value - 1));
  }

  nextItem() {
    this._activeItemIdx.update((value) => Math.min(value + 1, this.totalClipsList().length - 1));
  }
}
