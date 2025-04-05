import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { ToastsFacade } from './state/toasts.facade';
import { ToastsEntity } from './state/toasts.models';
import { createToastsEntity } from './state/utils/toasts.testing-utils';
import { ToastComponent } from './toast/toast.component';
import { ToastsRootComponent } from './toasts-root.component';

describe('ToastsRootComponent', () => {
  let component: ToastsRootComponent;
  let fixture: ComponentFixture<ToastsRootComponent>;
  let toastsFacade: jest.Mocked<ToastsFacade>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastsRootComponent, ToastComponent],
      providers: [
        provideNoopAnimations(),
        {
          provide: ToastsFacade,
          useValue: {
            toasts: signal<ToastsEntity[]>([createToastsEntity('test')]),
            showToast: jest.fn(),
            dismissToast: jest.fn(),
          },
        },
      ],
    }).compileComponents();

    toastsFacade = TestBed.inject(ToastsFacade) as jest.Mocked<ToastsFacade>;

    fixture = TestBed.createComponent(ToastsRootComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dismiss toast', () => {
    jest.spyOn(component, 'dismissToast');
    jest.spyOn(toastsFacade, 'dismissToast');

    const toastComponent = fixture.debugElement.queryAll(By.css('app-toast'))[0];
    toastComponent.componentInstance.toastDismissed.emit();

    expect(component.dismissToast).toHaveBeenCalled();
    expect(toastsFacade.dismissToast).toHaveBeenCalled();
  });
});
