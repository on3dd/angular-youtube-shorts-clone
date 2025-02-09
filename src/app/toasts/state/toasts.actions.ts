import { createAction, props } from '@ngrx/store';

import { Toast, ToastsEntity } from './toasts.models';

export const showToast = createAction('[Toasts] Show Toast', props<{ toast: Toast }>());

export const createToast = createAction('[Toasts] Create Toast', props<{ toast: ToastsEntity }>());

export const dismissToast = createAction('[Toasts] Dismiss Toast', props<{ toast: ToastsEntity }>());

export const dismissToastAfterTimeout = createAction(
  '[Toasts] Dismiss Toast After Timeout',
  props<{ toast: ToastsEntity }>(),
);

export const dismissToastNoop = createAction('[Toasts] Dismiss Toast Noop');
