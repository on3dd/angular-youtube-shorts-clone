import { ToastsEntity } from './toasts.models';
import { initialToastsState, toastsAdapter, ToastsPartialState } from './toasts.reducer';
import * as ToastsSelectors from './toasts.selectors';

describe('Toasts Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getToastsId = (it: ToastsEntity) => it.id;
  const createToastsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    }) as ToastsEntity;

  let state: ToastsPartialState;

  beforeEach(() => {
    state = {
      toasts: toastsAdapter.setAll(
        [createToastsEntity('PRODUCT-AAA'), createToastsEntity('PRODUCT-BBB'), createToastsEntity('PRODUCT-CCC')],
        {
          ...initialToastsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Toasts Selectors', () => {
    it('selectAllToasts() should return the list of Toasts', () => {
      const results = ToastsSelectors.selectAllToasts(state);
      const selId = getToastsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ToastsSelectors.selectEntity(state) as ToastsEntity;
      const selId = getToastsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectToastsLoaded() should return the current "loaded" status', () => {
      const result = ToastsSelectors.selectToastsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectToastsError() should return the current "error" state', () => {
      const result = ToastsSelectors.selectToastsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
