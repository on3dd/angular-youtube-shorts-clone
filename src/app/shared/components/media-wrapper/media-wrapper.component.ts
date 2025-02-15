import {
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
import { MediaUIEvents } from 'media-chrome/dist/constants';
import { EventOrAction } from 'media-chrome/dist/media-store/state-mediator';

import { MediaWrapperVideoDirective } from './media-wrapper-video.directive';

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
  imports: [NgIcon, MediaWrapperVideoDirective],
  providers: [provideIcons({ matVolumeOff, matVolumeMute, matVolumeDown, matVolumeUp, matPlayArrow, matPause })],
})
export class MediaWrapperComponent {
  readonly sources = input.required<MediaWrapperSources>();
  readonly autoplay = input<boolean>(false);

  readonly initFinished = output<void>();

  private readonly mediaControllerRef = viewChild.required<ElementRef<MediaController>>('controller');

  private readonly mediaControllerEl = computed(() => this.mediaControllerRef().nativeElement);

  play() {
    this.dispatchToMediaStore({ type: MediaUIEvents.MEDIA_PLAY_REQUEST });
  }

  stop() {
    this.dispatchToMediaStore({ type: MediaUIEvents.MEDIA_PAUSE_REQUEST });
  }

  mute() {
    this.dispatchToMediaStore({ type: MediaUIEvents.MEDIA_MUTE_REQUEST });
  }

  reset() {
    this.dispatchToMediaStore({ type: MediaUIEvents.MEDIA_SEEK_REQUEST, detail: 0 });
  }

  private dispatchToMediaStore(event: EventOrAction<unknown>) {
    this.mediaControllerEl().mediaStore.dispatch(event);
  }
}
