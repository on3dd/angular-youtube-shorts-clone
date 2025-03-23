import { PLATFORM_ID, TransferState } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';
import { ToastsFacade } from 'src/app/toasts/state/toasts.facade';

import { ClipsApiService, PAGE_SIZE } from '../services/clips-api.service';
import * as ClipsActions from './clips.actions';
import { CLIPS_STATE_KEY, ClipsEffects } from './clips.effects';
import { ClipsState } from './clips.reducer';
import * as ClipsSelectors from './clips.selectors';
import { createMockClipsEntity } from './utils/clips.testing-utils';

describe('ClipsEffects', () => {
  let actions: Observable<Action>;
  let store: MockStore<ClipsState>;
  let effects: ClipsEffects;
  let router: Router;
  let testScheduler: TestScheduler;

  let transferState: TransferState;
  let clipsApiService: jest.Mocked<ClipsApiService>;
  let toastsFacade: jest.Mocked<ToastsFacade>;

  const mockItem = createMockClipsEntity({
    id: '1',
    name: 'test1',
    title: 'Test 1',
  });
  const mockItems = [mockItem];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([])],
      providers: [
        Title,
        TransferState,
        ClipsEffects,
        provideMockActions(() => actions),
        provideMockStore({
          initialState: {
            ids: [],
            entities: {},
            activeItemIdx: null,
          },
        }),
        {
          provide: ClipsApiService,
          useValue: {
            getInitialPost: jest.fn(),
            getPosts: jest.fn(),
          },
        },
        {
          provide: ToastsFacade,
          useValue: { showToast: jest.fn() },
        },
        {
          provide: Router,
          useValue: {
            events: of(new NavigationEnd(1, '/clips/test1', '/clips/test1')),
            navigate: jest.fn(),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: null,
            snapshot: { params: { id: 'test1' } },
          },
        },
        { provide: PLATFORM_ID, useValue: 'browser' },
      ],
    });

    store = TestBed.inject(MockStore);
    effects = TestBed.inject(ClipsEffects);
    router = TestBed.inject(Router) as jest.Mocked<Router>;

    transferState = TestBed.inject(TransferState);
    clipsApiService = TestBed.inject(ClipsApiService) as jest.Mocked<ClipsApiService>;
    toastsFacade = TestBed.inject(ToastsFacade) as jest.Mocked<ToastsFacade>;

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('initialId$', () => {
    it('should emit the initial ID', () => {
      testScheduler.run(({ expectObservable }) => {
        expectObservable(effects.initialId$).toBe('(a|)', { a: 'test1' });
      });
    });
  });

  // Below we assume that the PAGE_SIZE is 10
  describe('lastPageLoaded$', () => {
    it('should not emit when activeItemIdx is null', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, null);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(0));
    });

    it('should emit initial page on the first time', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 0);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(0));
    });

    it('should emit new page number only when crossing page threshold', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 2);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(0));

      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 5);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(0));

      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 10);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(1));
    });

    it('should not emit when page number decreases', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 10);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(1));

      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 5);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(0));

      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, 2);
      effects.lastPageLoaded$.subscribe((page) => expect(page).toBe(0));
    });
  });

  describe('loadInitialPost$', () => {
    beforeEach(() => {
      transferState.remove(CLIPS_STATE_KEY);
    });

    it('should dispatch setTransferedState when state exists in transfer state', () => {
      testScheduler.run(({ expectObservable }) => {
        // Set the transfer state data
        transferState.set(CLIPS_STATE_KEY, mockItems);

        expectObservable(effects.loadInitialPost$).toBe('(a|)', {
          a: ClipsActions.setTransferedState({ items: mockItems }),
        });
      });
    });

    it('should fetch from API when no transfer state exists', () => {
      testScheduler.run(({ cold, flush, expectObservable }) => {
        clipsApiService.getInitialPost.mockReturnValue(cold('--a|', { a: mockItem }));

        expectObservable(effects.loadInitialPost$).toBe('--a|', {
          a: ClipsActions.loadInitialClipSuccess({ item: mockItem }),
        });

        flush();

        expect(clipsApiService.getInitialPost).toHaveBeenCalledWith('test1');
      });
    });

    it('should handle API errors when fetching initial post', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const testError = new Error('API Error');

        clipsApiService.getInitialPost.mockReturnValue(cold('--#', {}, testError));

        expectObservable(effects.loadInitialPost$).toBe('--(a|)', {
          a: ClipsActions.loadInitialClipFailure({ error: testError }),
        });
      });
    });
  });

  describe('loadInitialPostSuccess$', () => {
    it('should dispatch loadNextPage action with the item name', () => {
      testScheduler.run(({ expectObservable }) => {
        actions = of(ClipsActions.loadInitialClipSuccess({ item: mockItem }));

        expectObservable(effects.loadInitialPostSuccess$).toBe('(a|)', {
          a: ClipsActions.loadNextPage({ after: mockItem.name }),
        });
      });
    });
  });

  describe('loadNextPage$', () => {
    it('should fetch next page and dispatch success action', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        actions = of(ClipsActions.loadNextPage({ after: 'test1' }));

        store.overrideSelector(ClipsSelectors.selecClipsCount, 1);

        clipsApiService.getPosts.mockReturnValue(cold('--a|', { a: mockItems }));

        expectObservable(effects.loadNextPage$).toBe('--a|', {
          a: ClipsActions.loadNextPageSuccess({ items: mockItems }),
        });
      });
    });

    it('should handle API errors', () => {
      testScheduler.run(({ cold, expectObservable }) => {
        const error = new Error('API Error');

        actions = of(ClipsActions.loadNextPage({ after: 'test1' }));

        store.overrideSelector(ClipsSelectors.selecClipsCount, 1);

        clipsApiService.getPosts.mockReturnValue(cold('--#', {}, error));

        expectObservable(effects.loadNextPage$).toBe('--(a|)', {
          a: ClipsActions.loadNextPageFailure({ error }),
        });
      });
    });
  });

  describe('loadNextPageByLimit$', () => {
    beforeEach(() => {
      // Simulate page limit reached
      store.overrideSelector(ClipsSelectors.selectActiveItem, mockItem);
      store.overrideSelector(ClipsSelectors.selectActiveItemIdx, PAGE_SIZE);
    });

    it('should fetch next page when page limit is reached', () => {
      testScheduler.run(({ cold }) => {
        clipsApiService.getPosts.mockReturnValue(cold('--a|', { a: mockItems }));

        effects.loadNextPageByLimit$.subscribe((action) => {
          expect(action).toEqual(ClipsActions.loadNextPageSuccess({ items: mockItems }));
        });
      });
    });

    it('should handle API errors when loading next page', () => {
      testScheduler.run(({ cold }) => {
        const error = new Error('API Error');

        clipsApiService.getPosts.mockReturnValue(cold('--#', {}, error));

        effects.loadNextPageByLimit$.subscribe((action) => {
          expect(action).toEqual(ClipsActions.loadNextPageFailure({ error }));
        });
      });
    });
  });

  describe('handleError$', () => {
    it('should show error toast on initial clip load failure', () => {
      const error = new Error('Not Found');

      actions = of(ClipsActions.loadInitialClipFailure({ error }));

      effects.handleError$.subscribe();

      expect(toastsFacade.showToast).toHaveBeenCalledWith({
        type: 'error',
        message: error.message,
        autoDismissTime: null,
      });
    });

    it('should show error toast on next page load failure', () => {
      const error = new Error('API Error');

      actions = of(ClipsActions.loadNextPageFailure({ error }));

      effects.handleError$.subscribe();

      expect(toastsFacade.showToast).toHaveBeenCalledWith({
        type: 'error',
        message: error.message,
        autoDismissTime: null,
      });
    });
  });

  describe('redirectToActiveItem$', () => {
    it('should navigate to active item route', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItem, mockItem);

      effects.redirectToActiveItem$.subscribe();

      expect(router.navigate).toHaveBeenCalledWith(['/clips', mockItem.id]);
    });

    it('should not navigate when there is no active item', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItem, null);

      effects.redirectToActiveItem$.subscribe();

      expect(router.navigate).not.toHaveBeenCalled();
    });
  });

  describe('showNotImplementedToast$', () => {
    it('should show info toast for not implemented actions', () => {
      const actions$ = [
        ClipsActions.likeItem({ item: mockItem }),
        ClipsActions.dislikeItem({ item: mockItem }),
        ClipsActions.commentItem({ item: mockItem }),
        ClipsActions.shareItem({ item: mockItem }),
        ClipsActions.showMoreItem({ item: mockItem }),
      ];

      actions$.forEach((action) => {
        actions = of(action);

        effects.showNotImplementedToast$.subscribe();

        expect(toastsFacade.showToast).toHaveBeenCalledWith({
          type: 'info',
          message: 'Sorry, but this is not implemented yet!',
        });
      });
    });
  });

  describe('setPageTitle$', () => {
    let titleService: Title;

    beforeEach(() => {
      titleService = TestBed.inject(Title);
      jest.spyOn(titleService, 'setTitle');
    });

    it('should set page title when active item changes', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItem, mockItem);

      effects.setPageTitle$.subscribe();

      expect(titleService.setTitle).toHaveBeenCalledWith(`${mockItem.title} | angular-shorts-clone`);
    });

    it('should not set title when there is no active item', () => {
      store.overrideSelector(ClipsSelectors.selectActiveItem, null);

      effects.setPageTitle$.subscribe();

      expect(titleService.setTitle).not.toHaveBeenCalled();
    });
  });
});
