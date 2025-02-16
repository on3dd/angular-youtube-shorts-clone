import { Action } from '@ngrx/store';

import * as ClipsActions from './clips.actions';
import { ClipsEntity } from './clips.models';
import { clipsReducer, ClipsState, initialClipsState } from './clips.reducer';

describe('Clips Reducer', () => {
  const createClipsEntity = (id: string, name = ''): ClipsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Clips actions', () => {
    it('loadClipsSuccess should return the list of known Clips', () => {
      const clips = [createClipsEntity('PRODUCT-AAA'), createClipsEntity('PRODUCT-zzz')];
      const action = ClipsActions.loadClipsSuccess({ clips });

      const result: ClipsState = clipsReducer(initialClipsState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = clipsReducer(initialClipsState, action);

      expect(result).toBe(initialClipsState);
    });
  });
});
