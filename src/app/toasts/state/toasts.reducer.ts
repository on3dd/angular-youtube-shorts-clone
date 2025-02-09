import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';
import { ToastsEntity } from './toasts.models';

export const TOASTS_FEATURE_KEY = 'toasts';

export interface ToastsState extends EntityState<ToastsEntity> {
  createdCount: number;
}

export interface ToastsPartialState {
  readonly [TOASTS_FEATURE_KEY]: ToastsState;
}

export const toastsAdapter: EntityAdapter<ToastsEntity> = createEntityAdapter<ToastsEntity>();

export const initialToastsState: ToastsState = toastsAdapter.getInitialState({
  createdCount: 0,
  entities: [],
});

const reducer = createReducer(
  initialToastsState,

  on(ToastsActions.createToast, (state, { toast }) => {
    return toastsAdapter.addOne(toast, { ...state, createdCount: state.createdCount + 1 });
  }),

  on(
    //
    ToastsActions.dismissToast,
    ToastsActions.dismissToastAfterTimeout,
    (state, { toast }) => toastsAdapter.removeOne(toast.id, state),
  ),
);

export function toastsReducer(state: ToastsState | undefined, action: Action) {
  return reducer(state, action);
}
