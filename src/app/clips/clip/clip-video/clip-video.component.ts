import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  Injector,
  input,
  isDevMode,
  viewChild,
} from '@angular/core';
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

  readonly sources = computed<MediaWrapperSources>(() => {
    const media = this.data().secure_media!.reddit_video!;

    return {
      fallbackUrl: media.fallback_url,
      dashUrl: media.dash_url,
      hlsUrl: media.hls_url,
    };
  });

  private readonly mediaWrapperRef = viewChild.required(MediaWrapperComponent);

  constructor() {
    afterNextRender(() => {
      effect(
        () => {
          if (this.active()) {
            this.mediaWrapperRef().play();
          } else {
            // TODO: Only trigger this method when clip is running
            this.mediaWrapperRef().stop();
          }
        },
        { injector: this.injector },
      );
    });
  }

  onInitFinished() {
    const mediaWrapper = this.mediaWrapperRef();

    // TODO: check for env var instead?
    if (isDevMode()) mediaWrapper.mute();
    if (this.active()) mediaWrapper.play();
  }
}
