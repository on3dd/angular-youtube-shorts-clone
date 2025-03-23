import { Action } from '@ngrx/store';

import * as ClipsActions from './clips.actions';
import { ClipsEntity } from './clips.models';
import { clipsReducer, ClipsState, initialClipsState } from './clips.reducer';
import { createMockClipsEntity } from './utils/clips.testing-utils';

describe('Clips Reducer', () => {
  const items: ClipsEntity[] = [
    createMockClipsEntity({ id: '1', name: 'test1', title: 'Test 1' }),
    createMockClipsEntity({ id: '2', name: 'test2', title: 'Test 2' }),
    createMockClipsEntity({ id: '3', name: 'test3', title: 'Test 3' }),
  ];

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;
      const result = clipsReducer(initialClipsState, action);

      expect(result).toBe(initialClipsState);
    });
  });

  describe('ClipsActions.setTransferedState', () => {
    it('should populate the state with given data', () => {
      const action = ClipsActions.setTransferedState({ items });
      const result: ClipsState = clipsReducer(initialClipsState, action);

      expect(result).toEqual<ClipsState>({
        activeItemIdx: 0,
        ids: items.map((item) => item.data.name),
        entities: items.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}),
      });
    });
  });

  describe('ClipsActions.loadInitialClipSuccess', () => {
    it('should add new item to the state', () => {
      const item = createMockClipsEntity({ id: '1', name: 'test1', title: 'Test 1' });
      const action = ClipsActions.loadInitialClipSuccess({ item });
      const result: ClipsState = clipsReducer(initialClipsState, action);

      expect(result).toEqual<ClipsState>({
        activeItemIdx: 0,
        ids: [item.data.name],
        entities: { [item.data.name]: item },
      });
    });
  });

  describe('ClipsActions.loadNextPageSuccess', () => {
    it('should add new items to the state after existing ones', () => {
      const state: ClipsState = {
        activeItemIdx: 0,
        ids: items.map((item) => item.data.name),
        entities: items.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}),
      };

      const newItems: ClipsEntity[] = [
        createMockClipsEntity({ id: '4', name: 'test4', title: 'Test 4' }),
        createMockClipsEntity({ id: '5', name: 'test5', title: 'Test 5' }),
        createMockClipsEntity({ id: '6', name: 'test6', title: 'Test 6' }),
      ];

      const action = ClipsActions.loadNextPageSuccess({ items: newItems });
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toEqual<ClipsState>({
        activeItemIdx: 0,
        ids: [...state.ids, ...newItems.map((item) => item.data.name)] as string[],
        entities: { ...state.entities, ...newItems.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}) },
      });
    });
  });

  describe('ClipsActions.showPrevItem', () => {
    it('should not change the state if activeItemIdx is null', () => {
      const state: ClipsState = {
        activeItemIdx: null,
        ids: [],
        entities: {},
      };

      const action = ClipsActions.showPrevItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toBe(state);
    });

    it('should not change the state if activeItemIdx is 0', () => {
      const state: ClipsState = {
        activeItemIdx: 0,
        ids: items.map((item) => item.data.name),
        entities: items.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}),
      };

      const action = ClipsActions.showPrevItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toBe(state);
    });

    it('should decrement activeItemIdx if it is greater than 0', () => {
      const state: ClipsState = {
        activeItemIdx: 1,
        ids: items.map((item) => item.data.name),
        entities: items.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}),
      };

      const action = ClipsActions.showPrevItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toEqual<ClipsState>({ ...state, activeItemIdx: 0 });
    });
  });

  describe('ClipsActions.showNextItem', () => {
    it('should not change the state if activeItemIdx is null', () => {
      const state: ClipsState = {
        activeItemIdx: null,
        ids: [],
        entities: {},
      };

      const action = ClipsActions.showNextItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toBe(state);
    });

    it('should not change the state if there are no items', () => {
      const state: ClipsState = {
        activeItemIdx: 0,
        ids: [],
        entities: {},
      };

      const action = ClipsActions.showNextItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toBe(state);
    });

    it('should not change the state if activeItemIdx is the last item', () => {
      const state: ClipsState = {
        activeItemIdx: 2,
        ids: items.map((item) => item.data.name),
        entities: items.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}),
      };

      const action = ClipsActions.showNextItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toBe(state);
    });

    it('should increment activeItemIdx if it is less than the items length', () => {
      const state: ClipsState = {
        activeItemIdx: 0,
        ids: items.map((item) => item.data.name),
        entities: items.reduce((acc, item) => ({ ...acc, [item.data.name]: item }), {}),
      };

      const action = ClipsActions.showNextItem();
      const result: ClipsState = clipsReducer(state, action);

      expect(result).toEqual<ClipsState>({ ...state, activeItemIdx: 1 });
    });
  });
});
