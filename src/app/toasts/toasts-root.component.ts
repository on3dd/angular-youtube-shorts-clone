import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { matCheckCircle, matError, matInfo } from '@ng-icons/material-icons/baseline';

type Toast = {
  message: string;
  title?: string;
  icon: string;
  type: 'info' | 'success' | 'error' | 'warning';
};

@Component({
  selector: 'app-toasts-root',
  templateUrl: './toasts-root.component.html',
  styleUrl: './toasts-root.component.css',
  host: { class: 'block absolute top-2 left-[50%] -translate-x-[50%] z-[1000]' },
  imports: [NgClass, NgIcon],
  providers: [provideIcons({ matInfo, matCheckCircle, matError })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsRootComponent {
  readonly toasts = signal<Toast[]>([
    {
      type: 'info',
      message: 'New settings available on your account',
      icon: 'matInfo',
    },
    {
      type: 'success',
      message: 'Your changes are saved successfully.',
      icon: 'matCheckCircle',
    },
    {
      type: 'error',
      message: 'Error has occured while saving changes.',
      icon: 'matError',
    },
    {
      type: 'warning',
      message: 'Username you have entered is invalid.',
      icon: 'matError',
    },
  ]);

  readonly statusColorVariants: Record<Toast['type'], { text: string; border: string }> = {
    info: { text: 'text-blue-500', border: 'border-blue-500' },
    success: { text: 'text-green-500', border: 'border-green-500' },
    error: { text: 'text-red-500', border: 'border-red-500' },
    warning: { text: 'text-yellow-500', border: 'border-yellow-500' },
  };
}
