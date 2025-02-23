import { ToastsEntity } from './toasts.models';
import { initialToastsState, toastsAdapter, ToastsPartialState, ToastsState } from './toasts.reducer';
import * as ToastsSelectors from './toasts.selectors';
import { createToastsEntity } from './utils/toasts.testing-utils';

describe('Toasts Selectors', () => {
  let toasts: ToastsEntity[];
  let state: ToastsPartialState;

  beforeEach(() => {
    toasts = [
      //
      createToastsEntity('Toast 1', 1),
      createToastsEntity('Toast 2', 2),
      createToastsEntity('Toast 3', 3),
    ];

    state = {
      toasts: toastsAdapter.setAll(toasts, initialToastsState),
    };
  });

  describe('Toasts Selectors', () => {
    it('selectAllToasts() should return the list of Toasts', () => {
      const results = ToastsSelectors.selectAllToasts(state);

      expect(results.length).toBe(3);
      expect(results).toEqual(toasts);
    });

    it('selectCreatedCount() should return the total amount of entities created.', () => {
      const result = ToastsSelectors.selectCreatedCount.projector({
        createdCount: toasts.length,
      } as ToastsState);

      expect(result).toBe(toasts.length);
    });
  });
});
