import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCheckCircle, matError, matInfo } from '@ng-icons/material-icons/baseline';

import { Toast } from '../shared/toast.types';

export const TOAST_STATUS_COLOR_VARIANTS: Record<Toast['type'], { icon: string; border: string }> = {
  info: { icon: 'text-blue-500', border: 'border-blue-500' },
  success: { icon: 'text-green-500', border: 'border-green-500' },
  error: { icon: 'text-red-500', border: 'border-red-500' },
  warning: { icon: 'text-yellow-500', border: 'border-yellow-500' },
};

export const TOAST_STATUS_ICON_VARIANTS: Record<Toast['type'], string> = {
  info: 'matInfo',
  success: 'matCheckCircle',
  error: 'matError',
  warning: 'matError',
};

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css',
  imports: [NgClass, NgIcon],
  providers: [provideIcons({ matInfo, matCheckCircle, matError })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  readonly toast = input.required<Toast>();

  readonly toastDismissed = output();

  readonly vm = computed(() => {
    const toast = this.toast();

    return {
      toast,
      icon: TOAST_STATUS_ICON_VARIANTS[toast.type],
      color: TOAST_STATUS_COLOR_VARIANTS[toast.type],
    };
  });
}
