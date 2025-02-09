import { createFeatureSelector, createSelector } from '@ngrx/store';

import { TOASTS_FEATURE_KEY, toastsAdapter, ToastsState } from './toasts.reducer';

// Lookup the 'Toasts' feature state managed by NgRx
export const selectToastsState = createFeatureSelector<ToastsState>(TOASTS_FEATURE_KEY);

const { selectAll } = toastsAdapter.getSelectors();

export const selectAllToasts = createSelector(selectToastsState, (state: ToastsState) => selectAll(state));
export const selectCreatedCount = createSelector(selectToastsState, (state: ToastsState) => state.createdCount);
