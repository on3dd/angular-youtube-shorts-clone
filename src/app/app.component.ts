import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matThumbUp } from '@ng-icons/material-icons/baseline';

@Component({
  imports: [RouterModule, NgIcon, NgClass],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ matThumbUp })],
})
export class AppComponent {
  title = 'angular-shorts-clone';
}
