import { Route } from '@angular/router';

import { ClipsComponent } from './clips/clips.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: ClipsComponent,
  },
  {
    path: ':id',
    component: ClipsComponent,
  },
];
