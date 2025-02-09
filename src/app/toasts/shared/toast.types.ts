export type Toast = {
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  title?: string;
  autoDismissTime?: null | number;
};
