import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as ClipsActions from './clips.actions';
import { ClipsEffects } from './clips.effects';
import { ClipsFacade } from './clips.facade';
import { ClipsEntity } from './clips.models';
import { CLIPS_FEATURE_KEY, ClipsState, initialClipsState, clipsReducer } from './clips.reducer';
import * as ClipsSelectors from './clips.selectors';

interface TestSchema {
  clips: ClipsState;
}

describe('ClipsFacade', () => {
  let facade: ClipsFacade;
  let store: Store<TestSchema>;
  const createClipsEntity = (id: string, name = ''): ClipsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(CLIPS_FEATURE_KEY, clipsReducer), EffectsModule.forFeature([ClipsEffects])],
        providers: [ClipsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(ClipsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allClips$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allClips$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadClipsSuccess` to manually update list
     */
    it('allClips$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allClips$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        ClipsActions.loadClipsSuccess({
          clips: [createClipsEntity('AAA'), createClipsEntity('BBB')],
        }),
      );

      list = await readFirst(facade.allClips$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
