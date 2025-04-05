import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

import { ClipComponent } from './clip.component';
import { ClipActionsComponent } from './clip-actions/clip-actions.component';
import { ClipOverlayComponent } from './clip-overlay/clip-overlay.component';
import { ClipVideoComponent } from './clip-video/clip-video.component';

describe('ClipComponent', () => {
  let component: ClipComponent;
  let fixture: ComponentFixture<ClipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipComponent, ClipVideoComponent, ClipOverlayComponent, ClipActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('data', {} as RedditPostData);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
