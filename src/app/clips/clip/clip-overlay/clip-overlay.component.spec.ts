import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

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
  });

  it('should create', () => {
    fixture.componentRef.setInput('data', {} as RedditPostData);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
