import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ClipComponent } from './clip/clip.component';

@Component({
  selector: 'app-clips',
  imports: [ClipComponent],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  host: { class: 'flex ' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent {}
