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
  host: { class: 'block h-full sm:mb-2 sm:scroll-my-4' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipComponent {
  readonly data = input.required<RedditPostData>();
  readonly active = input.required<boolean>();

  readonly prevItem = output<RedditPostData>();
  readonly nextItem = output<RedditPostData>();

  readonly likeItem = output<RedditPostData>();
  readonly dislikeItem = output<RedditPostData>();
  readonly commentItem = output<RedditPostData>();
  readonly shareItem = output<RedditPostData>();
  readonly showMoreItem = output<RedditPostData>();
}
