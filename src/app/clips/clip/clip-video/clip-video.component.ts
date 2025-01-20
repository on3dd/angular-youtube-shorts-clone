import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  viewChild,
} from '@angular/core';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

@Component({
  selector: 'app-clip-video',
  imports: [],
  templateUrl: './clip-video.component.html',
  styleUrl: './clip-video.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipVideoComponent {
  private readonly injector = inject(Injector);

  readonly data = input.required<RedditPostData>();
  readonly active = input.required<boolean>();

  readonly videoRef = viewChild.required<HTMLVideoElement, ElementRef<HTMLVideoElement>>('video', { read: ElementRef });

  constructor() {
    afterNextRender(() => {
      effect(
        () => {
          console.log(`${this.data().name}, active: ${this.active()}`);

          const video = this.videoRef().nativeElement;

          video.currentTime = 0;

          if (this.active()) {
            video.play();
          } else {
            video.pause();
          }
        },
        { injector: this.injector },
      );
    });
  }
}
