import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ClipActionsComponent } from './clip-actions/clip-actions.component';
import { ClipOverlayComponent } from './clip-overlay/clip-overlay.component';
import { ClipVideoComponent } from './clip-video/clip-video.component';

@Component({
  selector: 'app-clip',
  imports: [ClipVideoComponent, ClipOverlayComponent, ClipActionsComponent],
  templateUrl: './clip.component.html',
  styleUrl: './clip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipComponent {}
