import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    // FIXME: CHANGE TO "SERVER" AND RESOLVE HYDRATION ISSUE
    renderMode: RenderMode.Client,
  },
];
