import { Action } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';
import { ToastsEntity } from './toasts.models';
import { initialToastsState, toastsReducer, ToastsState } from './toasts.reducer';

describe('Toasts Reducer', () => {
  const createToastsEntity = (id: string, name = ''): ToastsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Toasts actions', () => {
    it('loadToastsSuccess should return the list of known Toasts', () => {
      const toasts = [createToastsEntity('PRODUCT-AAA'), createToastsEntity('PRODUCT-zzz')];
      const action = ToastsActions.showToast({ toasts });

      const result: ToastsState = toastsReducer(initialToastsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = toastsReducer(initialToastsState, action);

      expect(result).toBe(initialToastsState);
    });
  });
});
