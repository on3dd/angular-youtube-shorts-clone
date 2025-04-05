import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { Toast } from '../shared/toast.types';
import { createToast } from '../state/utils/toasts.testing-utils';
import { TOAST_STATUS_COLOR_VARIANTS, TOAST_STATUS_ICON_VARIANTS, ToastComponent } from './toast.component';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('toast', createToast('test'));
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should return correct vm', () => {
    const type: Toast['type'] = 'info';
    const toast = createToast('test', 0, type);

    fixture.componentRef.setInput('toast', toast);
    fixture.detectChanges();

    expect(component.vm()).toEqual({
      toast,
      icon: TOAST_STATUS_ICON_VARIANTS[type],
      color: TOAST_STATUS_COLOR_VARIANTS[type],
    });
  });

  describe('toastDismissed', () => {
    let control: HTMLDivElement;

    beforeEach(() => {
      const toast = createToast('test');

      fixture.componentRef.setInput('toast', toast);
      fixture.detectChanges();

      control = fixture.debugElement.query(By.css('div')).nativeElement;

      jest.spyOn(component.toastDismissed, 'emit');
    });

    it('should emit toastDismissed on click', () => {
      control.click();

      expect(component.toastDismissed.emit).toHaveBeenCalled();
    });

    it('should emit toastDismissed on keydown', () => {
      control.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));

      expect(component.toastDismissed.emit).toHaveBeenCalled();
    });
  });
});
