import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule, provideEffects } from '@ngrx/effects';
import { provideState, provideStore, Store, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import * as ToastsActions from './toasts.actions';
import { AUTO_DISMISS_DELAY_MS, ToastsEffects } from './toasts.effects';
import { ToastsFacade } from './toasts.facade';
import { ToastsEntity } from './toasts.models';
import { initialToastsState, TOASTS_FEATURE_KEY, toastsReducer, ToastsState } from './toasts.reducer';
import { selectAllToasts } from './toasts.selectors';
import { createToast, createToastsEntity } from './utils/toasts.testing-utils';

interface TestSchema {
  toasts: ToastsState;
}

describe('ToastsFacade', () => {
  let facade: ToastsFacade;
  // let store: MockStore<TestSchema>;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(TOASTS_FEATURE_KEY, toastsReducer), EffectsModule.forFeature([ToastsEffects])],
        providers: [ToastsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      // TestBed.configureTestingModule({
      //   imports: [],
      //   providers: [
      //     ToastsFacade,
      //     // ToastsEffects,
      //     provideEffects(ToastsEffects),
      //     provideStore(),
      //     provideState(TOASTS_FEATURE_KEY, toastsReducer),
      //     provideMockStore({
      //       initialState: initialToastsState,
      //       // selectors: [{ selector: selectAllToasts, value: [] }],
      //     }),
      //     // provideState(TOASTS_FEATURE_KEY, toastsReducer),
      //   ],
      // });

      // store = TestBed.inject(MockStore);
      store = TestBed.inject(Store);
      facade = TestBed.inject(ToastsFacade);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('showToast() should call the ToastsActions.showToast', () => {
      const spy = jest.spyOn(ToastsActions, 'showToast');

      facade.showToast(createToast('Toast 1'));

      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('dismissToast() should call the ToastsActions.dismissToast', () => {
      const spy = jest.spyOn(ToastsActions, 'dismissToast');

      facade.dismissToast(createToastsEntity('Toast 1'));

      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
