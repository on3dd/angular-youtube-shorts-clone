import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { ClipComponent } from './clip/clip.component';
import { MOCK_API_RESPONSE } from './clip/utils/constants';

@Component({
  selector: 'app-clips',
  imports: [ClipComponent],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  host: { class: 'flex ' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent {
  private readonly clipsResponse = signal(MOCK_API_RESPONSE);

  readonly clipsList = computed(() => this.clipsResponse().data.children);
}
