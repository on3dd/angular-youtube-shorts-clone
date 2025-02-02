import { Route } from '@angular/router';

import { ClipsComponent } from './clips.component';

export const routes: Route[] = [
  {
    path: '',
    component: ClipsComponent,
  },
  {
    path: ':full_name',
    component: ClipsComponent,
  },
];
