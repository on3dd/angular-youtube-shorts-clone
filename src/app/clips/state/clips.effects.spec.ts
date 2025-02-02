import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ClipsActions from './clips.actions';
import { ClipsEffects } from './clips.effects';

describe('ClipsEffects', () => {
  let actions: Observable<Action>;
  let effects: ClipsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ClipsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(ClipsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ClipsActions.initClips() });

      const expected = hot('-a-|', { a: ClipsActions.loadClipsSuccess({ clips: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
