import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { delay, map, mergeMap, of } from 'rxjs';

import * as ToastsActions from './toasts.actions';
import { ToastsEntity } from './toasts.models';
import * as fromToasts from './toasts.reducer';
import { selectCreatedCount } from './toasts.selectors';

const AUTO_DISMISS_DELAY_MS = 5000;

@Injectable()
export class ToastsEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store<fromToasts.ToastsState>);

  readonly createToast$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToastsActions.showToast),
      concatLatestFrom(() => this.store.select(selectCreatedCount)),
      map(([{ toast }, createdCount]) => {
        const newToast: ToastsEntity = { ...toast, id: createdCount + 1 };

        if (newToast.autoDismissTime === undefined) {
          newToast.autoDismissTime = AUTO_DISMISS_DELAY_MS;
        }

        return ToastsActions.createToast({ toast: newToast });
      }),
    );
  });

  readonly dismissToastAfterTimeout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToastsActions.createToast),
      mergeMap(({ toast }) => {
        if (!toast || toast.autoDismissTime === null) {
          return of(ToastsActions.dismissToastNoop());
        }

        return of(toast).pipe(
          delay(toast.autoDismissTime!),
          map((toast) => ToastsActions.dismissToastAfterTimeout({ toast })),
        );
      }),
    );
  });
}
