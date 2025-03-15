import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ClipsActions from './clips.actions';
import * as ClipsSelectors from './clips.selectors';

@Injectable()
export class ClipsFacade {
  private readonly store = inject(Store);

  readonly clips = this.store.selectSignal(ClipsSelectors.selectAllClips);
  readonly activeItem = this.store.selectSignal(ClipsSelectors.selectActiveItem);
  readonly activeItemIdx = this.store.selectSignal(ClipsSelectors.selectActiveItemIdx);

  prevItem() {
    this.store.dispatch(ClipsActions.showPrevItem());
  }

  nextItem() {
    this.store.dispatch(ClipsActions.showNextItem());
  }

  likeItem() {
    this.store.dispatch(ClipsActions.likeItem());
  }

  dislikeItem() {
    this.store.dispatch(ClipsActions.dislikeItem());
  }

  commentItem() {
    this.store.dispatch(ClipsActions.commentItem());
  }

  shareItem() {
    this.store.dispatch(ClipsActions.shareItem());
  }

  showMoreItem() {
    this.store.dispatch(ClipsActions.showMoreItem());
  }
}
