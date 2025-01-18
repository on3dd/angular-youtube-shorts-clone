import { Route } from '@angular/router';

import { ClipComponent } from './clip/clip.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ClipComponent,
  },
  {
    path: ':id',
    component: ClipComponent,
  },
];
