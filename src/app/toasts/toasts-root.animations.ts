import { animate, style, transition, trigger } from '@angular/animations';

export const toastShowHide = trigger('showHide', [
  transition(':enter', [
    style({
      opacity: 0,
      transform: 'translateY(-100%)',
    }),
    animate(
      '150ms ease-in',
      style({
        opacity: 1,
        transform: 'translateY(0)',
      }),
    ),
  ]),
  transition(':leave', [
    animate(
      '150ms ease-out',
      style({
        opacity: 0,
        transform: 'translateY(-100%)',
      }),
    ),
  ]),
]);
