import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaWrapperComponent } from './media-wrapper.component';

describe('MediaWrapperComponent', () => {
  let component: MediaWrapperComponent;
  let fixture: ComponentFixture<MediaWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaWrapperComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.componentRef.setInput('sources', {
      hlsUrl: 'https://example.com/hls.m3u8',
      dashUrl: 'https://example.com/dash.mpd',
      fallbackUrl: 'https://example.com/fallback.mp4',
    });
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
