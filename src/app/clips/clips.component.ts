import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  viewChildren,
} from '@angular/core';

import { ClipComponent } from './clip/clip.component';
import { ClipsFacade } from './state/clips.facade';

@Component({
  selector: 'app-clips',
  imports: [ClipComponent],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  host: { class: 'flex' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent {
  private readonly injector = inject(Injector);
  private readonly clipsFacade = inject(ClipsFacade);

  private readonly clipsRefs = viewChildren<ClipComponent, ElementRef<HTMLElement>>(ClipComponent, {
    read: ElementRef,
  });

  protected readonly vm = computed(() => ({
    clips: this.clipsFacade.clips(),
    activeItem: this.clipsFacade.activeItem(),
    activeItemIdx: this.clipsFacade.activeItemIdx(),
  }));

  constructor() {
    afterNextRender(() => {
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
}
