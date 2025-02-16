import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  Injector,
  viewChildren,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { fromEvent, throttleTime } from 'rxjs';

import { ClipComponent } from './clip/clip.component';
import { ClipsFacade } from './state/clips.facade';

const WHEEL_THROTTLE_TIME_MS = 1000;

@Component({
  selector: 'app-clips',
  imports: [ClipComponent],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  host: { class: 'flex h-screen overflow-hidden sm:py-4 lg:px-8' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent {
  private readonly injector = inject(Injector);
  private readonly destroyRef = inject(DestroyRef);
  private readonly clipsFacade = inject(ClipsFacade);

  private readonly clipsRefs = viewChildren<ClipComponent, ElementRef<HTMLElement>>(ClipComponent, {
    read: ElementRef,
  });

  protected readonly vm = computed(() => ({
    clips: this.clipsFacade.clips(),
    activeItemIdx: this.clipsFacade.activeItemIdx(),
  }));

  constructor() {
    afterNextRender(() => {
      fromEvent<WheelEvent>(window, 'wheel')
        .pipe(takeUntilDestroyed(this.destroyRef), throttleTime(WHEEL_THROTTLE_TIME_MS))
        .subscribe(({ deltaY }) => {
          if (deltaY > 0) {
            this.clipsFacade.nextItem();
          } else {
            this.clipsFacade.prevItem();
          }
        });

      effect(
        () => {
          const idx = this.clipsFacade.activeItemIdx();

          if (typeof idx === 'number') {
            const clipRef = this.clipsRefs()[idx];

            clipRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        },
        { injector: this.injector },
      );
    });
  }

  prevItem() {
    this.clipsFacade.prevItem();
  }

  nextItem() {
    this.clipsFacade.nextItem();
  }

  likeItem() {
    this.clipsFacade.likeItem();
  }

  dislikeItem() {
    this.clipsFacade.dislikeItem();
  }

  commentItem() {
    this.clipsFacade.commentItem();
  }

  shareItem() {
    this.clipsFacade.shareItem();
  }

  showMoreItem() {
    this.clipsFacade.showMoreItem();
  }
}
