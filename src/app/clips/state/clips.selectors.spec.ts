import { ClipsEntity } from './clips.models';
import { clipsAdapter, ClipsPartialState, initialClipsState } from './clips.reducer';
import * as ClipsSelectors from './clips.selectors';
import { createMockClipsEntity } from './utils/clips.testing-utils';

describe('Clips Selectors', () => {
  const clips: ClipsEntity[] = [
    createMockClipsEntity({ id: '1', name: 'test1', title: 'Test 1' }),
    createMockClipsEntity({ id: '2', name: 'test2', title: 'Test 2' }),
    createMockClipsEntity({ id: '3', name: 'test3', title: 'Test 3' }),
  ];

  const populateState = (activeItemIdx: number | null = 0) => ({
    clips: clipsAdapter.setAll(clips, { ...initialClipsState, activeItemIdx }),
  });

  let state: ClipsPartialState;

  beforeEach(() => {
    state = { clips: initialClipsState };
  });

  describe('Clips Selectors', () => {
    it('selectAllClips() should return the list of Clips', () => {
      // Empty state
      const result1 = ClipsSelectors.selectAllClips(state);
      expect(result1).toEqual([]);

      // Populated state
      const result2 = ClipsSelectors.selectAllClips(populateState());
      expect(result2).toEqual(clips);
    });

    it('selectActiveItemIdx() should return the active item index', () => {
      // Empty state
      const result1 = ClipsSelectors.selectActiveItemIdx(state);
      expect(result1).toBe(null);

      // Populated state
      const result2 = ClipsSelectors.selectActiveItemIdx(populateState(0));
      expect(result2).toBe(0);
    });

    it('selectActiveItem() should return the active item', () => {
      // Empty state
      const result1 = ClipsSelectors.selectActiveItem(state);
      expect(result1).toEqual(null);

      // Populated state
      const result2 = ClipsSelectors.selectActiveItem(populateState(0));
      expect(result2).toEqual(clips[0]);
    });

    it('selecClipsCount() should return the total amount of entities created.', () => {
      // Empty state
      const result1 = ClipsSelectors.selecClipsCount(state);
      expect(result1).toBe(0);

      // Populated state
      const result2 = ClipsSelectors.selecClipsCount(populateState());
      expect(result2).toBe(3);
    });
  });
});
