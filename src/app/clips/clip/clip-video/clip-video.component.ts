import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  viewChild,
} from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { distinctUntilChanged, startWith } from 'rxjs';
import {
  MediaWrapperComponent,
  MediaWrapperSources,
} from 'src/app/shared/components/media-wrapper/media-wrapper.component';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

@Component({
  selector: 'app-clip-video',
  imports: [MediaWrapperComponent],
  templateUrl: './clip-video.component.html',
  styleUrl: './clip-video.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipVideoComponent {
  private readonly injector = inject(Injector);

  readonly data = input.required<RedditPostData>();
  readonly active = input.required<boolean>();

  readonly sources = computed<MediaWrapperSources | null>(() => {
    const media = this.data().secure_media?.reddit_video;

    if (!media) {
      return null;
    }

    return {
      fallbackUrl: media.fallback_url,
      dashUrl: media.dash_url,
      hlsUrl: media.hls_url,
    };
  });

  private readonly mediaWrapperRef = viewChild.required(MediaWrapperComponent);

  constructor() {
    afterNextRender(() => {
      // Automatically play or stop video playback on active change.
      toObservable(this.active, { injector: this.injector })
        .pipe(
          startWith(false),
          distinctUntilChanged((prev, curr) => prev === curr),
        )
        .subscribe((curr) => {
          if (curr) {
            console.log('curr', curr);
            console.log('this.data()', this.data());
            console.log('this.data().secure_media', this.data().secure_media);
          }

          const mediaWrapper = this.mediaWrapperRef();

          if (curr) {
            mediaWrapper.reset();
            mediaWrapper.play();
          } else {
            mediaWrapper.stop();
          }
        });
    });
  }
}
