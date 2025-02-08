import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CLIPS_FEATURE_KEY, clipsAdapter, ClipsState } from './clips.reducer';

export const selectClipsState = createFeatureSelector<ClipsState>(CLIPS_FEATURE_KEY);

const { selectAll } = clipsAdapter.getSelectors();

export const selectClipsError = createSelector(selectClipsState, (state: ClipsState) => state.error);

export const selectAllClips = createSelector(selectClipsState, (state: ClipsState) => selectAll(state));

export const selectActiveItemIdx = createSelector(selectClipsState, (state: ClipsState) => state.activeItemIdx);

export const selectActiveItem = createSelector(selectAllClips, selectActiveItemIdx, (clips, activeItemIdx) =>
  activeItemIdx === null ? null : clips[activeItemIdx],
);

export const selecClipsCount = createSelector(selectAllClips, (clips) => clips.length ?? 0);
