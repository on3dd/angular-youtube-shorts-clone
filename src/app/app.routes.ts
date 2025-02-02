import { Route } from '@angular/router';

import { CLIPS_PROVIDERS } from './clips/clips.providers';

export const appRoutes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'clips',
  },
  {
    path: 'clips',
    providers: [CLIPS_PROVIDERS],
    loadChildren: () => import('./clips/clips.routes').then((r) => r.routes),
  },
];
