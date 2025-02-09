import { inject, Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';
import { Toast, ToastsEntity } from './toasts.models';
import * as ToastsSelectors from './toasts.selectors';

@Injectable()
export class ToastsFacade {
  private readonly store = inject(Store);

  private readonly _toasts$ = this.store.pipe(select(ToastsSelectors.selectAllToasts));

  readonly toasts = toSignal(this._toasts$, { requireSync: true });

  showToast(toast: Toast) {
    this.store.dispatch(ToastsActions.showToast({ toast }));
  }

  dismissToast(toast: ToastsEntity) {
    this.store.dispatch(ToastsActions.dismissToast({ toast }));
  }
}
