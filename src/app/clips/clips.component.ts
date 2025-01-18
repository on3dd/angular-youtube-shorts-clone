import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { Router } from '@angular/router';

import { ClipComponent } from './clip/clip.component';
import { ClipsService } from './services/clips.service';

@Component({
  selector: 'app-clips',
  imports: [ClipComponent],
  providers: [ClipsService],
  templateUrl: './clips.component.html',
  styleUrl: './clips.component.css',
  host: { class: 'flex ' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClipsComponent {
  private readonly router = inject(Router);
  private readonly clipsService = inject(ClipsService);

  readonly clipsList = this.clipsService.clipsList;

  constructor() {
    effect(() => {
      const clips = this.clipsList();

      if (clips.length > 0) {
        this.router.navigate(['/', clips[0].data.name]);
      }
    });
  }
}
