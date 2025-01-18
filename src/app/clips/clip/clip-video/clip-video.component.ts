import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

@Component({
  selector: 'app-clip-video',
  imports: [],
  templateUrl: './clip-video.component.html',
  styleUrl: './clip-video.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipVideoComponent {
  readonly data = input.required<RedditPostData>();
}
