import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import * as ToastsActions from './toasts.actions';
import { AUTO_DISMISS_DELAY_MS, ToastsEffects } from './toasts.effects';
import { initialToastsState } from './toasts.reducer';
import * as ToastsSelectors from './toasts.selectors';
import { createToast, createToastsEntity } from './utils/toasts.testing-utils';

describe('ToastsEffects', () => {
  let actions: Observable<Action>;
  let effects: ToastsEffects;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ToastsEffects,
        provideMockActions(() => actions),
        provideMockStore({ initialState: initialToastsState }),
      ],
    });

    effects = TestBed.inject(ToastsEffects);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    let createdCount = 0;

    jest.spyOn(ToastsSelectors, 'selectCreatedCount').mockImplementation(() => createdCount++);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createToast$', () => {
    it('should create new Toast when the showToast action is invoked.', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        // Default delay
        const toast1 = createToast('Toast 1');
        // Custom delay
        const dismissTime2 = 1000;
        const toast2 = createToast('Toast 2', dismissTime2);
        // Null delay
        const dismissTime3 = null;
        const toast3 = createToast('Toast 3', dismissTime3);

        actions = hot('-a-b-c-', {
          a: ToastsActions.showToast({ toast: toast1 }),
          b: ToastsActions.showToast({ toast: toast2 }),
          c: ToastsActions.showToast({ toast: toast3 }),
        });

        expectObservable(effects.createToast$).toBe('-a-b-c-', {
          a: ToastsActions.createToast({
            toast: { ...toast1, id: 1, autoDismissTime: AUTO_DISMISS_DELAY_MS },
          }),
          b: ToastsActions.createToast({
            toast: { ...toast2, id: 2, autoDismissTime: dismissTime2 },
          }),
          c: ToastsActions.createToast({
            toast: { ...toast3, id: 3, autoDismissTime: dismissTime3 },
          }),
        });
      });
    });
  });

  describe('dismissToastAfterTimeout$', () => {
    it('should not dissmiss test if autodismissTime is null', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const toast = createToastsEntity('Toast 1', 1, null);

        actions = hot('-a--', { a: ToastsActions.createToast({ toast }) });

        expectObservable(effects.dismissToastAfterTimeout$).toBe('-a--', {
          a: ToastsActions.dismissToastNoop({ toast }),
        });
      });
    });

    it('should dissmiss test after autodismissTime', () => {
      testScheduler.run(({ hot, expectObservable }) => {
        const toast = createToastsEntity('Toast 1', 1, 1000);

        actions = hot('a---', { a: ToastsActions.createToast({ toast }) });

        expectObservable(effects.dismissToastAfterTimeout$).toBe('1000ms a', {
          a: ToastsActions.dismissToastAfterTimeout({ toast }),
        });
      });
    });
  });
});
