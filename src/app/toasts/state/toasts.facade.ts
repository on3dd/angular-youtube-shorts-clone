import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';
import { Toast, ToastsEntity } from './toasts.models';
import * as ToastsSelectors from './toasts.selectors';

@Injectable()
export class ToastsFacade {
  private readonly store = inject(Store);

  readonly toasts = this.store.selectSignal(ToastsSelectors.selectAllToasts);

  showToast(toast: Toast) {
    this.store.dispatch(ToastsActions.showToast({ toast }));
  }

  dismissToast(toast: ToastsEntity) {
    this.store.dispatch(ToastsActions.dismissToast({ toast }));
  }
}
