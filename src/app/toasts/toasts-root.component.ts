import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ToastsFacade } from './state/toasts.facade';
import { ToastsEntity } from './state/toasts.models';
import { ToastComponent } from './toast/toast.component';

@Component({
  selector: 'app-toasts-root',
  templateUrl: './toasts-root.component.html',
  styleUrl: './toasts-root.component.css',
  imports: [ToastComponent],
  host: { class: 'block absolute top-2 left-[50%] -translate-x-[50%] z-[1000]' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastsRootComponent {
  private readonly toastsFacade = inject(ToastsFacade);

  readonly toasts = this.toastsFacade.toasts;

  dismissToast(toast: ToastsEntity) {
    this.toastsFacade.dismissToast(toast);
  }
}
