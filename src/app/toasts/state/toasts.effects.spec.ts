import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as ToastsActions from './toasts.actions';
import { ToastsEffects } from './toasts.effects';

describe('ToastsEffects', () => {
  let actions: Observable<Action>;
  let effects: ToastsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ToastsEffects, provideMockActions(() => actions), provideMockStore()],
    });

    effects = TestBed.inject(ToastsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: ToastsActions.initToasts() });

      const expected = hot('-a-|', { a: ToastsActions.showToast({ toasts: [] }) });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
