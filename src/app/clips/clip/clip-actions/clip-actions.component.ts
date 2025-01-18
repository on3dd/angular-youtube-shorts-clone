import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  matArrowDownward,
  matArrowUpward,
  matComment,
  matMoreVert,
  matShare,
  matThumbDown,
  matThumbUp,
} from '@ng-icons/material-icons/baseline';

type MenuAction = {
  // name for screen readers
  name: string;
  icon: string;
  label?: string;
  active?: boolean;
  // TODO: add on-click action
};

@Component({
  selector: 'app-clip-actions',
  imports: [NgClass, NgIcon],
  templateUrl: './clip-actions.component.html',
  styleUrl: './clip-actions.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,

  providers: [
    provideIcons({ matThumbUp, matComment, matMoreVert, matShare, matThumbDown, matArrowUpward, matArrowDownward }),
  ],
})
export class ClipActionsComponent {
  protected readonly actions: MenuAction[] = [
    { name: 'Like', label: '356k', icon: 'matThumbUp', active: true },
    { name: 'Dislike', label: 'Dislike', icon: 'matThumbDown' },
    { name: 'Comment', label: '2 742', icon: 'matComment' },
    { name: 'Share', label: 'Share', icon: 'matShare' },
    { name: 'More', icon: 'matMoreVert' },
    // TODO: Show only on md and above
    { name: 'Previous', icon: 'matArrowUpward' },
    { name: 'Next', icon: 'matArrowDownward' },
  ];
}
