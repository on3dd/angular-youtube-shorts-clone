import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

@Component({
  selector: 'app-clip-overlay',
  imports: [],
  templateUrl: './clip-overlay.component.html',
  styleUrl: './clip-overlay.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipOverlayComponent {
  readonly data = input.required<RedditPostData>();
}
