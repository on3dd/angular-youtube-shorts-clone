import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipOverlayComponent } from './clip-overlay.component';

describe('ClipOverlayComponent', () => {
  let component: ClipOverlayComponent;
  let fixture: ComponentFixture<ClipOverlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipOverlayComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
