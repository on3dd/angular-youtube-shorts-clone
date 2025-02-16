import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, isDevMode, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withRouterConfig } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { ToastsEffects } from './toasts/state/toasts.effects';
import { ToastsFacade } from './toasts/state/toasts.facade';
import * as fromToasts from './toasts/state/toasts.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    ToastsFacade,
    provideStore(),
    provideEffects(ToastsEffects),
    provideState(fromToasts.TOASTS_FEATURE_KEY, fromToasts.toastsReducer),
    provideStoreDevtools({ logOnly: !isDevMode() }),
    provideClientHydration(withEventReplay()),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes, withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
  ],
};
