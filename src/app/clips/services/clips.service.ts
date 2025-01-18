import { computed, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, of } from 'rxjs';

import { MOCK_API_RESPONSE } from '../clip/utils/constants';

const PAGE_SIZE = 5;

const mockApiRequest = (page: number) => of(MOCK_API_RESPONSE.data.children.slice(page, PAGE_SIZE)).pipe(delay(1000));

@Injectable()
export class ClipsService {
  private readonly _activeItemIdx = signal<number>(0);
  readonly activeItemIdx = this._activeItemIdx.asReadonly();

  private readonly activePageIdx = computed(() => this.activeItemIdx() / PAGE_SIZE);

  private readonly clipsResourse = rxResource({
    request: this.activePageIdx,
    loader: ({ request }) => mockApiRequest(request),
  });

  readonly clipsList = computed(
    () => this.clipsResourse.value()?.filter((clip) => clip.data?.media?.reddit_video) ?? [],
  );

  prevItem() {
    this._activeItemIdx.update((value) => Math.max(0, value - 1));
  }

  nextItem() {
    this._activeItemIdx.update((value) => Math.min(value + 1, this.clipsList().length));
  }
}
