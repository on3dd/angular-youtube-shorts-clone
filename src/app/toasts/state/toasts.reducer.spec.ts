import { Action } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';
import { initialToastsState, toastsReducer, ToastsState } from './toasts.reducer';
import { createToast, createToastsEntity } from './utils/toasts.testing-utils';

describe('Toasts Reducer', () => {
  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;
      const result = toastsReducer(initialToastsState, action);

      expect(result).toBe(initialToastsState);
    });
  });

  describe('ToastsActions.showToast', () => {
    it('should not change the state', () => {
      const toast = createToast('Toast 1');
      const action = ToastsActions.showToast({ toast });
      const result: ToastsState = toastsReducer(initialToastsState, action);

      expect(result).toEqual(initialToastsState);
    });
  });

  describe('ToastsActions.createToast', () => {
    it('should add new Toast to the state', () => {
      const toast1 = createToastsEntity('Toast 1');
      const action1 = ToastsActions.createToast({ toast: toast1 });
      const result1: ToastsState = toastsReducer(initialToastsState, action1);

      expect(result1).toEqual<ToastsState>({
        createdCount: 1,
        ids: [toast1.id],
        entities: { [toast1.id]: toast1 },
      });
    });
  });

  describe('ToastsActions.dismissToast', () => {
    it('should remove existing Toast from the store', () => {
      const toast = createToastsEntity('Toast 1');
      const showAction = ToastsActions.createToast({ toast });
      const showResult: ToastsState = toastsReducer(initialToastsState, showAction);

      expect(showResult).toEqual<ToastsState>({
        createdCount: 1,
        ids: [toast.id],
        entities: { [toast.id]: toast },
      });

      const dismissAction = ToastsActions.dismissToast({ toast });
      const dismissResult: ToastsState = toastsReducer(showResult, dismissAction);

      expect(dismissResult).toEqual<ToastsState>({
        createdCount: 1,
        ids: [],
        entities: {},
      });
    });

    it('should return previous state if Toast is not in the store', () => {
      const toast = createToastsEntity('Toast 1');

      const dismissAction = ToastsActions.dismissToast({ toast });
      const dismissResult: ToastsState = toastsReducer(initialToastsState, dismissAction);

      expect(dismissResult).toEqual<ToastsState>({
        createdCount: 0,
        ids: [],
        entities: {},
      });
    });
  });

  describe('ToastsActions.dismissToastAfterTimeout', () => {
    it('should remove existing Toast from the store', () => {
      const toast = createToastsEntity('Toast 1');
      const showAction = ToastsActions.createToast({ toast });
      const showResult: ToastsState = toastsReducer(initialToastsState, showAction);

      expect(showResult).toEqual<ToastsState>({
        createdCount: 1,
        ids: [toast.id],
        entities: { [toast.id]: toast },
      });

      const dismissAction = ToastsActions.dismissToastAfterTimeout({ toast });
      const dismissResult: ToastsState = toastsReducer(showResult, dismissAction);

      expect(dismissResult).toEqual<ToastsState>({
        createdCount: 1,
        ids: [],
        entities: {},
      });
    });

    it('should return previous state if Toast is not in the store', () => {
      const toast = createToastsEntity('Toast 1');

      const dismissAction = ToastsActions.dismissToastAfterTimeout({ toast });
      const dismissResult: ToastsState = toastsReducer(initialToastsState, dismissAction);

      expect(dismissResult).toEqual<ToastsState>({
        createdCount: 0,
        ids: [],
        entities: {},
      });
    });
  });
});
