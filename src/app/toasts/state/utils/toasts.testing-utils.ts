import { Toast, ToastsEntity } from '../toasts.models';

export function createToast(message: string, autoDismissTime?: number | null, type: Toast['type'] = 'info'): Toast {
  return { message, type, autoDismissTime: autoDismissTime };
}

export function createToastsEntity(message: string, id?: number, autoDismissTime?: number | null): ToastsEntity {
  return {
    message,
    id: id ?? 1,
    type: 'info',
    autoDismissTime: autoDismissTime,
  };
}
