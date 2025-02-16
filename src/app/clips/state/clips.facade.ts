import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import * as ClipsActions from './clips.actions';
import * as ClipsSelectors from './clips.selectors';

@Injectable()
export class ClipsFacade {
  private readonly store = inject(Store);

  readonly _clips$ = this.store.select(ClipsSelectors.selectAllClips);
  readonly _activeItem$ = this.store.select(ClipsSelectors.selectActiveItem);
  readonly _activeItemIdx$ = this.store.select(ClipsSelectors.selectActiveItemIdx);

  readonly clips = toSignal(this._clips$);
  readonly activeItem = toSignal(this._activeItem$);
  readonly activeItemIdx = toSignal(this._activeItemIdx$);

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
