import { ClipsEntity } from './clips.models';
import { clipsAdapter, ClipsPartialState, initialClipsState } from './clips.reducer';
import * as ClipsSelectors from './clips.selectors';

describe('Clips Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getClipsId = (it: ClipsEntity) => it.id;
  const createClipsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    }) as ClipsEntity;

  let state: ClipsPartialState;

  beforeEach(() => {
    state = {
      clips: clipsAdapter.setAll(
        [createClipsEntity('PRODUCT-AAA'), createClipsEntity('PRODUCT-BBB'), createClipsEntity('PRODUCT-CCC')],
        {
          ...initialClipsState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        },
      ),
    };
  });

  describe('Clips Selectors', () => {
    it('selectAllClips() should return the list of Clips', () => {
      const results = ClipsSelectors.selectAllClips(state);
      const selId = getClipsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = ClipsSelectors.selectEntity(state) as ClipsEntity;
      const selId = getClipsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectClipsLoaded() should return the current "loaded" status', () => {
      const result = ClipsSelectors.selectClipsLoaded(state);

      expect(result).toBe(true);
    });

    it('selectClipsError() should return the current "error" state', () => {
      const result = ClipsSelectors.selectClipsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
