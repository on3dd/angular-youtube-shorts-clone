import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

import { ClipActionsComponent } from './clip-actions.component';

describe('ClipActionsComponent', () => {
  let component: ClipActionsComponent;
  let fixture: ComponentFixture<ClipActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipActionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipActionsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('data', {} as RedditPostData);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
