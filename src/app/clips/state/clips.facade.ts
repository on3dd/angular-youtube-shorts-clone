import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ClipsActions from './clips.actions';
import { ClipsEntity } from './clips.models';
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

  likeItem(item: ClipsEntity) {
    this.store.dispatch(ClipsActions.likeItem({ item }));
  }

  dislikeItem(item: ClipsEntity) {
    this.store.dispatch(ClipsActions.dislikeItem({ item }));
  }

  commentItem(item: ClipsEntity) {
    this.store.dispatch(ClipsActions.commentItem({ item }));
  }

  shareItem(item: ClipsEntity) {
    this.store.dispatch(ClipsActions.shareItem({ item }));
  }

  showMoreItem(item: ClipsEntity) {
    this.store.dispatch(ClipsActions.showMoreItem({ item }));
  }
}
