import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import * as ToastsActions from './toasts.actions';
import { ToastsEffects } from './toasts.effects';
import { ToastsFacade } from './toasts.facade';
import { TOASTS_FEATURE_KEY, toastsReducer } from './toasts.reducer';
import { createToast, createToastsEntity } from './utils/toasts.testing-utils';

describe('ToastsFacade', () => {
  let facade: ToastsFacade;

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
