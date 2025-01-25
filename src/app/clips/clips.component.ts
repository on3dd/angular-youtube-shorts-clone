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
import { Router } from '@angular/router';

import { ClipComponent } from './clip/clip.component';
import { ClipsFacade } from './services/clips.facade';

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
  private readonly router = inject(Router);
  private readonly clipsFacade = inject(ClipsFacade);

  private readonly clipsRefs = viewChildren<ClipComponent, ElementRef<HTMLElement>>(ClipComponent, {
    read: ElementRef,
  });

  protected readonly vm = computed(() => ({
    clipsList: this.clipsFacade.clipsList(),
    activeItem: this.clipsFacade.activeItem(),
    activeItemIdx: this.clipsFacade.activeItemIdx(),
  }));

  constructor() {
    effect(() => {
      const activeItem = this.clipsFacade.activeItem();

      if (activeItem) {
        this.router.navigate(['/', activeItem.data.name]);
      }
    });

    afterNextRender(() => {
      effect(
        () => {
          const idx = this.clipsFacade.activeItemIdx();
          this.clipsRefs()[idx]?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
