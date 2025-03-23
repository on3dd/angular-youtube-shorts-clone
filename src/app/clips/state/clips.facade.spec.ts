import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ToastsFacade } from 'src/app/toasts/state/toasts.facade';

import { ClipsApiService } from '../services/clips-api.service';
import * as ClipsActions from './clips.actions';
import { ClipsEffects } from './clips.effects';
import { ClipsFacade } from './clips.facade';
import { CLIPS_FEATURE_KEY, clipsReducer } from './clips.reducer';
import { createMockClipsEntity } from './utils/clips.testing-utils';

describe('ClipsFacade', () => {
  let facade: ClipsFacade;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CLIPS_FEATURE_KEY, clipsReducer),
          EffectsModule.forFeature([ClipsEffects]),
          RouterModule.forChild([]),
        ],
        providers: [
          ClipsFacade,
          { provide: ClipsApiService, useValue: {} },
          { provide: ToastsFacade, useValue: { showToast: jest.fn() } },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), RouterModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}

      TestBed.configureTestingModule({ imports: [RootModule] });

      facade = TestBed.inject(ClipsFacade);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('prevItem() should call the ClipsActions.showPrevItem', () => {
      const spy = jest.spyOn(ClipsActions, 'showPrevItem');
      expect(spy).toHaveBeenCalledTimes(0);

      facade.prevItem();
      expect(spy).toHaveBeenCalledTimes(1);

      facade.prevItem();
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('nextItem() should call the ClipsActions.showNextItem', () => {
      const spy = jest.spyOn(ClipsActions, 'showNextItem');
      expect(spy).toHaveBeenCalledTimes(0);

      facade.nextItem();
      expect(spy).toHaveBeenCalledTimes(1);

      facade.nextItem();
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('likeItem() should call the ClipsActions.likeItem', () => {
      const spy = jest.spyOn(ClipsActions, 'likeItem');
      expect(spy).toHaveBeenCalledTimes(0);

      facade.likeItem(createMockClipsEntity({ id: '1', name: 'test1', title: 'Test 1' }));
      expect(spy).toHaveBeenCalledTimes(1);

      facade.likeItem(createMockClipsEntity({ id: '2', name: 'test2', title: 'Test 2' }));
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('dislikeItem() should call the ClipsActions.dislikeItem', () => {
      const spy = jest.spyOn(ClipsActions, 'dislikeItem');
      expect(spy).toHaveBeenCalledTimes(0);

      facade.dislikeItem(createMockClipsEntity({ id: '1', name: 'test1', title: 'Test 1' }));
      expect(spy).toHaveBeenCalledTimes(1);

      facade.dislikeItem(createMockClipsEntity({ id: '2', name: 'test2', title: 'Test 2' }));
      expect(spy).toHaveBeenCalledTimes(2);
    });

    it('commentItem() should call the ClipsActions.commentItem', () => {
      const spy = jest.spyOn(ClipsActions, 'commentItem');
      expect(spy).toHaveBeenCalledTimes(0);

      facade.commentItem(createMockClipsEntity({ id: '1', name: 'test1', title: 'Test 1' }));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
