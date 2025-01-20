import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

import { ClipActionsComponent } from './clip-actions/clip-actions.component';
import { ClipOverlayComponent } from './clip-overlay/clip-overlay.component';
import { ClipVideoComponent } from './clip-video/clip-video.component';

@Component({
  selector: 'app-clip',
  imports: [ClipVideoComponent, ClipOverlayComponent, ClipActionsComponent],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  host: { class: 'h-full mb-2 sm:mb-4 scroll-mt-2 scroll-mb-4 sm:scroll-my-6' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipComponent {
  readonly data = input.required<RedditPostData>();

  readonly prevItem = output<RedditPostData>();
  readonly nextItem = output<RedditPostData>();
}
