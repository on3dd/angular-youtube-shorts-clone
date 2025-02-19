import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
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
import { RedditPostData } from 'src/app/shared/types/reddit.types';

type MenuAction = {
  // name for screen readers
  name: string;
  icon: string;
  label?: string | number;
  active?: boolean;
  onClick?: () => void;
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
  readonly data = input.required<RedditPostData>();
  readonly active = input.required<boolean>();

  readonly prevItem = output<RedditPostData>();
  readonly nextItem = output<RedditPostData>();

  readonly likeItem = output<RedditPostData>();
  readonly dislikeItem = output<RedditPostData>();
  readonly commentItem = output<RedditPostData>();
  readonly shareItem = output<RedditPostData>();
  readonly showMoreItem = output<RedditPostData>();

  readonly actions = computed<MenuAction[]>(() => {
    const data = this.data();

    return [
      {
        name: 'Like',
        icon: 'matThumbUp',
        label: data.ups,
        active: true,
        onClick: () => this.likeItem.emit(data),
      },
      {
        name: 'Dislike',
        icon: 'matThumbDown',
        label: 'Dislike',
        onClick: () => this.dislikeItem.emit(data),
      },
      {
        name: 'Comment',
        icon: 'matComment',
        label: data.num_comments,
        onClick: () => this.commentItem.emit(data),
      },
      {
        name: 'Share',
        icon: 'matShare',
        label: 'Share',
        onClick: () => this.shareItem.emit(data),
      },
      {
        name: 'More',
        icon: 'matMoreVert',
        onClick: () => this.showMoreItem.emit(data),
      },
      {
        name: 'Previous',
        icon: 'matArrowUpward',
        onClick: () => this.prevItem.emit(data),
      },
      {
        name: 'Next',
        icon: 'matArrowDownward',
        onClick: () => this.nextItem.emit(data),
      },
    ];
  });
}
