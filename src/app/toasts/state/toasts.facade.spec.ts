import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ToastsActions from './toasts.actions';
import { ToastsEffects } from './toasts.effects';
import { ToastsFacade } from './toasts.facade';
import { ToastsEntity } from './toasts.models';
import { TOASTS_FEATURE_KEY, toastsReducer, ToastsState } from './toasts.reducer';

interface TestSchema {
  toasts: ToastsState;
}

describe('ToastsFacade', () => {
  let facade: ToastsFacade;
  let store: Store<TestSchema>;
  const createToastsEntity = (id: string, name = ''): ToastsEntity => ({
    id,
    name: name || `name-${id}`,
  });

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

      store = TestBed.inject(Store);
      facade = TestBed.inject(ToastsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allToasts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allToasts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadToastsSuccess` to manually update list
     */
    it('allToasts$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allToasts$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ToastsActions.showToast({
          toasts: [createToastsEntity('AAA'), createToastsEntity('BBB')],
        }),
      );

      list = await readFirst(facade.allToasts$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
