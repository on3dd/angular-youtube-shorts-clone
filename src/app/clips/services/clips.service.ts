import { computed, effect, inject, Injectable, Signal, signal } from '@angular/core';
import { rxResource, toObservable, toSignal } from '@angular/core/rxjs-interop';
import { map, scan, tap } from 'rxjs';
import { RedditPostObj } from 'src/app/shared/types/reddit.types';

import { ClipsApiService, PAGE_SIZE } from './clips-api.service';

@Injectable({ providedIn: 'root' })
export class ClipsService {
  private readonly clipsApiService = inject(ClipsApiService);

  private readonly _activeItemIdx = signal<number>(0);
  readonly activeItemIdx = this._activeItemIdx.asReadonly();

  private readonly _activePageIdx$ = toObservable(this.activeItemIdx).pipe(
    map((idx) => Math.floor((idx + 1) / PAGE_SIZE)),
    scan((prev, curr) => (curr > prev ? curr : prev), 0),
  );

  private readonly _activePageIdx = toSignal(this._activePageIdx$, { initialValue: 0 });

  private readonly _afterItemName: Signal<string | null> = computed(() => {
    const pageIdx = this._activePageIdx();
    const clips = this.totalClipsList();

    if (pageIdx > 0 && clips.length > 0) {
      return clips[pageIdx * PAGE_SIZE - 1]?.data.name;
    }

    return null;
  });

  private readonly clipsResourse = rxResource({
    request: this._afterItemName,
    loader: ({ request }) => this.clipsApiService.getPosts(request),
  });

  private readonly _clipsList = computed(() => {
    const clips = this.clipsResourse.value();

    if (!clips) return [];

    console.log('clips from server', clips);

    return clips
      .map((clip) => {
        // Handle cases when post itself doesn't have a video, but has crossposts
        if (!clip.data?.secure_media?.reddit_video && clip.data?.crosspost_parent_list) {
          const crossPostWithMedia = clip.data?.crosspost_parent_list.find(
            (crossPost) => crossPost.secure_media?.reddit_video,
          );

          if (crossPostWithMedia) {
            clip.data.secure_media = crossPostWithMedia.secure_media;
          }
        }

        return clip;
      })
      .filter((post) => post?.data.secure_media?.reddit_video);
  });

  private readonly _totalClipsList$ = toObservable(this._clipsList).pipe(
    tap((newClips) => console.log('newClips', newClips)),
    scan((prev, curr) => prev.concat(curr), [] as RedditPostObj[]),
  );

  /** Total list of the loaded items. */
  readonly totalClipsList = toSignal(this._totalClipsList$, { initialValue: [] });

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
