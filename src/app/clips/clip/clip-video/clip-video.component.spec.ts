import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipVideoComponent } from './clip-video.component';

describe('ClipVideoComponent', () => {
  let component: ClipVideoComponent;
  let fixture: ComponentFixture<ClipVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipVideoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
