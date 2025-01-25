import { inject, Injectable } from '@angular/core';

import { ClipsService } from './clips.service';

@Injectable({ providedIn: 'root' })
export class ClipsFacade {
  private readonly clipsApiService = inject(ClipsService);

  readonly clipsList = this.clipsApiService.totalClipsList;
  readonly activeItem = this.clipsApiService.activeItem;
  readonly activeItemIdx = this.clipsApiService.activeItemIdx;

  prevItem() {
    this.clipsApiService.prevItem();
  }

  nextItem() {
    this.clipsApiService.nextItem();
  }
}
