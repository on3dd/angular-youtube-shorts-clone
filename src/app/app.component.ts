import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matComment, matMoreVert, matShare, matThumbDown, matThumbUp } from '@ng-icons/material-icons/baseline';

type MenuAction = {
  // name for screen readers
  name: string;
  icon: string;
  label?: string;
  active?: boolean;
  // TODO: add on-click action
};

@Component({
  imports: [RouterModule, NgIcon, NgClass],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideIcons({ matThumbUp, matComment, matMoreVert, matShare, matThumbDown })],
})
export class AppComponent {
  title = 'angular-shorts-clone';

  protected readonly actions: MenuAction[] = [
    { name: 'Like', label: '356k', icon: 'matThumbUp', active: true },
    { name: 'Dislike', label: 'Dislike', icon: 'matThumbDown' },
    { name: 'Comment', label: '2 742', icon: 'matComment' },
    { name: 'Share', label: 'Share', icon: 'matShare' },
    { name: 'More', icon: 'matMoreVert' },
  ];
}
