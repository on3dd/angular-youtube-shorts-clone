import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastsRootComponent } from './toasts-root.component';

describe('ToastsRootComponent', () => {
  let component: ToastsRootComponent;
  let fixture: ComponentFixture<ToastsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastsRootComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
