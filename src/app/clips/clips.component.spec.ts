import { computed, signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ClipsComponent, WHEEL_THROTTLE_TIME_MS } from './clips.component';
import { ClipsFacade } from './state/clips.facade';
import { ClipsEntity } from './state/clips.models';

describe('ClipsComponent', () => {
  let fixture: ComponentFixture<ClipsComponent>;
  let component: ClipsComponent;
  let clipsFacade: jest.Mocked<ClipsFacade>;

  async function setupComponentFixture() {
    await TestBed.compileComponents();

    clipsFacade = TestBed.inject(ClipsFacade) as jest.Mocked<ClipsFacade>;
    fixture = TestBed.createComponent(ClipsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  }

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [ClipsComponent],
      providers: [
        {
          provide: ClipsFacade,
          useValue: {
            clips: jest.fn(),
            activeItemIdx: jest.fn(),
            nextItem: jest.fn(),
            prevItem: jest.fn(),
            likeItem: jest.fn(),
            dislikeItem: jest.fn(),
            commentItem: jest.fn(),
            shareItem: jest.fn(),
            showMoreItem: jest.fn(),
          },
        },
      ],
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('simple facade methods', () => {
    beforeEach(() => {
      setupComponentFixture();
    });

    it('should call prevItem', () => {
      component.prevItem();
      expect(clipsFacade.prevItem).toHaveBeenCalled();
    });

    it('should call nextItem', () => {
      component.nextItem();
      expect(clipsFacade.nextItem).toHaveBeenCalled();
    });

    it('should call likeItem', () => {
      component.likeItem({} as ClipsEntity);
      expect(clipsFacade.likeItem).toHaveBeenCalled();
    });

    it('should call dislikeItem', () => {
      component.dislikeItem({} as ClipsEntity);
      expect(clipsFacade.dislikeItem).toHaveBeenCalled();
    });

    it('should call commentItem', () => {
      component.commentItem({} as ClipsEntity);
      expect(clipsFacade.commentItem).toHaveBeenCalled();
    });

    it('should call shareItem', () => {
      component.shareItem({} as ClipsEntity);
      expect(clipsFacade.shareItem).toHaveBeenCalled();
    });
  });

  describe('wheel event', () => {
    beforeEach(async () => {
      await setupComponentFixture();
    });

    function emitWheelEvent(direction: 'down' | 'up') {
      window.dispatchEvent(
        new WheelEvent('wheel', {
          deltaY: direction === 'down' ? 100 : -100,
        }),
      );
    }

    it('should call nextItem when wheel is scrolled down', async () => {
      emitWheelEvent('down');

      expect(clipsFacade.nextItem).toHaveBeenCalled();
    });

    it('should call prevItem when wheel is scrolled up', async () => {
      emitWheelEvent('up');

      expect(clipsFacade.prevItem).toHaveBeenCalled();
    });

    it('should throttle wheel events based on WHEEL_THROTTLE_TIME_MS', fakeAsync(() => {
      const count = 15;
      const delay = 100;

      // Emit 15 scroll down events within 1.5s
      for (let i = 0; i < count; i++) {
        emitWheelEvent('down');
        tick(delay);
      }

      const expectedCalls = Math.ceil((count * delay) / WHEEL_THROTTLE_TIME_MS);

      expect(clipsFacade.nextItem).toHaveBeenCalledTimes(expectedCalls);
    }));
  });

  describe('scroll into view', () => {
    const clips = [{ id: '1' }, { id: '2' }] as ClipsEntity[];

    beforeEach(async () => {
      const clipsSignal = signal<ClipsEntity[]>(clips);
      const activeIdxSignal = signal<number | null>(null);

      TestBed.overrideProvider(ClipsFacade, {
        useValue: {
          clips: clipsSignal,
          activeItemIdx: activeIdxSignal,
        },
      });

      await setupComponentFixture();
    });

    it('should not scroll into view when activeItemIdx is not set', async () => {
      jest.spyOn(component, 'clipsRefs').mockReturnValue([]);

      await fixture.whenStable();

      expect(component.clipsRefs().length).toBe(0);
    });

    it('should scroll into view when activeItemIdx changes', async () => {
      jest
        .spyOn(component, 'clipsRefs')
        .mockReturnValue(clips.map(() => ({ nativeElement: { scrollIntoView: jest.fn() } }) as any));

      const activeClipRef = computed(() => component.clipsRefs()[clipsFacade.activeItemIdx()!]);

      await fixture.whenStable();

      expect(activeClipRef()).toBeUndefined();

      (clipsFacade.activeItemIdx as any).set(0);
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(activeClipRef().nativeElement.scrollIntoView).toHaveBeenCalledTimes(1);

      (clipsFacade.activeItemIdx as any).set(1);
      TestBed.flushEffects();
      fixture.detectChanges();

      expect(activeClipRef().nativeElement.scrollIntoView).toHaveBeenCalledTimes(1);
    });
  });
});
