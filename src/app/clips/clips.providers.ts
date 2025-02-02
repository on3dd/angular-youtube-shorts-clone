import { EnvironmentProviders, Provider } from '@angular/core';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { ClipsApiService } from './services/clips-api.service';
import { ClipsEffects } from './state/clips.effects';
import { ClipsFacade } from './state/clips.facade';
import * as fromClips from './state/clips.reducer';

export const CLIPS_PROVIDERS: (Provider | EnvironmentProviders)[] = [
  ClipsApiService,
  ClipsFacade,
  provideEffects(ClipsEffects),
  provideState(fromClips.CLIPS_FEATURE_KEY, fromClips.clipsReducer),
];
