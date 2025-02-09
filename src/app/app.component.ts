import 'media-chrome';
import 'hls-video-element';
import 'dash-video-element';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ToastsRootComponent } from './toasts/toasts-root.component';

@Component({
  imports: [RouterOutlet, ToastsRootComponent],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'angular-shorts-clone';
}
