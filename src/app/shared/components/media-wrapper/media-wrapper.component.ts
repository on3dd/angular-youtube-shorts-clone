import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matPause,
  matPlayArrow,
  matVolumeDown,
  matVolumeMute,
  matVolumeOff,
  matVolumeUp,
} from '@ng-icons/material-icons/baseline';
import { MediaController } from 'media-chrome';
import { MediaUIAttributes, MediaUIEvents } from 'media-chrome/dist/constants';

export type MediaWrapperSources = {
  hlsUrl?: string;
  dashUrl?: string;
  fallbackUrl: string;
};

@Component({
  selector: 'app-media-wrapper',
  templateUrl: './media-wrapper.component.html',
  styleUrl: './media-wrapper.component.css',
  host: { class: 'block h-full' },
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [NgIcon],
  providers: [provideIcons({ matVolumeOff, matVolumeMute, matVolumeDown, matVolumeUp, matPlayArrow, matPause })],
})
export class MediaWrapperComponent {
  readonly sources = input.required<MediaWrapperSources>();

  readonly initFinished = output();

  private readonly mediaControllerRef = viewChild.required<ElementRef<MediaController>>('controller');

  private readonly mediaControllerEl = computed(() => this.mediaControllerRef().nativeElement);

  constructor() {
    // Manually start video playback when the `MEDIA_BUFFERED` event fires for the first time when `autoplay` is `true`.
    afterNextRender(() => {
      this.mediaControllerEl().addEventListener(
        MediaUIAttributes.MEDIA_SEEKABLE,
        () => {
          this.initFinished.emit();
        },
        { once: true },
      );
    });
  }

  play() {
    console.log('play');
    this.mediaControllerEl().mediaStore.dispatch({ type: MediaUIEvents.MEDIA_SEEK_REQUEST, detail: 0 });
    this.mediaControllerEl().mediaStore.dispatch({ type: MediaUIEvents.MEDIA_PLAY_REQUEST });
  }

  stop() {
    console.log('stop');
    this.mediaControllerEl().mediaStore.dispatch({ type: MediaUIEvents.MEDIA_PAUSE_REQUEST });
  }

  mute() {
    this.mediaControllerEl().mediaStore.dispatch({ type: MediaUIEvents.MEDIA_MUTE_REQUEST });
  }
}
