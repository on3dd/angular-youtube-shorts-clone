import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  viewChildren,
} from '@angular/core';
import { Router } from '@angular/router';

import { ClipComponent } from './clip/clip.component';
import { ClipsService } from './services/clips.service';

@Component({
  selector: 'app-clips',
  imports: [ClipComponent],
  providers: [ClipsService],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  host: { class: 'flex' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent {
  private readonly injector = inject(Injector);
  private readonly router = inject(Router);
  private readonly clipsService = inject(ClipsService);

  private readonly clipsRefs = viewChildren<ClipComponent, ElementRef<HTMLElement>>(ClipComponent, {
    read: ElementRef,
  });

  readonly clipsList = this.clipsService.totalClipsList;

  constructor() {
    effect(() => {
      const activeItem = this.clipsService.activeItem();

      if (activeItem) {
        this.router.navigate(['/', activeItem.data.name]);
      }
    });

    afterNextRender(() => {
      effect(
        () => {
          const idx = this.clipsService.activeItemIdx();
          this.clipsRefs()[idx]?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        },
        { injector: this.injector },
      );
    });
  }

  prevItem() {
    this.clipsService.prevItem();
  }

  nextItem() {
    this.clipsService.nextItem();
  }
}
