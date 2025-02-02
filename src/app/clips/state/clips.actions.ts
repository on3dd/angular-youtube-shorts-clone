import { createAction, props } from '@ngrx/store';

import { ClipsEntity } from './clips.models';

// Set state transfered from server
export const setTransferedState = createAction('[Clips Page] Set Transfered State', props<{ items: ClipsEntity[] }>());

// Load initial clip
export const loadInitialClip = createAction('[Clips Page] Load Initial Clip');
export const loadInitialClipSuccess = createAction(
  '[Clips/API] Load Initial Clip Success',
  props<{ item: ClipsEntity }>(),
);
export const loadInitialClipFailure = createAction('[Clips/API] Load Initial Clip Failure', props<{ error: any }>());

// Load next page
export const loadNextPage = createAction('[Clips Page] Load Next Page', props<{ after?: string }>());
export const loadNextPageSuccess = createAction(
  '[Clips/API] Load Next Page Success',
  props<{ items: ClipsEntity[] }>(),
);
export const loadNextPageFailure = createAction('[Clips/API] Load Next Page Failure', props<{ error: any }>());

// Show next/prev item
export const showNextItem = createAction('[Clips Page] Show Next Item');
export const showPrevItem = createAction('[Clips Page] Show Prev Item');
