import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MediaWrapperComponent } from 'src/app/shared/components/media-wrapper/media-wrapper.component';
import { RedditPostData } from 'src/app/shared/types/reddit.types';

import { ClipVideoComponent } from './clip-video.component';

const mockSources = {
  fallback_url: 'https://example.com/fallback.mp4',
  dash_url: 'https://example.com/dash.mpd',
  hls_url: 'https://example.com/hls.m3u8',
};

describe('ClipVideoComponent', () => {
  let component: ClipVideoComponent;
  let fixture: ComponentFixture<ClipVideoComponent>;

  function getMediaWrapper() {
    return fixture.debugElement.query(By.directive(MediaWrapperComponent));
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipVideoComponent, MediaWrapperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipVideoComponent);
    component = fixture.componentInstance;
  });

  beforeEach(() => {
    fixture.componentRef.setInput('data', {
      secure_media: { reddit_video: mockSources },
    } as RedditPostData);
    fixture.componentRef.setInput('active', true);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('sources', () => {
    describe('when reddit_video is present', () => {
      it('should return the sources', () => {
        expect(component.sources()).toEqual({
          hlsUrl: mockSources.hls_url,
          dashUrl: mockSources.dash_url,
          fallbackUrl: mockSources.fallback_url,
        });
      });

      it('should create media wrapper', () => {
        expect(getMediaWrapper()).toBeTruthy();
      });
    });

    describe('when reddit_video is not present', () => {
      beforeEach(() => {
        fixture.componentRef.setInput('data', {} as RedditPostData);
        fixture.detectChanges();
      });

      it('should return null', () => {
        expect(component.sources()).toEqual(null);
      });

      it('should not create media wrapper', () => {
        expect(getMediaWrapper()).toBeFalsy();
      });
    });
  });

  describe('media playback', () => {
    let mediaWrapper: MediaWrapperComponent;

    beforeEach(() => {
      mediaWrapper = getMediaWrapper().componentInstance;
      jest.spyOn(mediaWrapper, 'play').mockReturnValue();
      jest.spyOn(mediaWrapper, 'stop').mockReturnValue();
      jest.spyOn(mediaWrapper, 'reset').mockReturnValue();
    });

    it('should play if active was changed from false to true', () => {
      fixture.componentRef.setInput('active', false);
      fixture.detectChanges();

      fixture.componentRef.setInput('active', true);
      fixture.detectChanges();

      expect(mediaWrapper.reset).toHaveBeenCalled();
      expect(mediaWrapper.play).toHaveBeenCalled();
    });

    it('should stop if active was changed from true to false', () => {
      fixture.componentRef.setInput('active', true);
      fixture.detectChanges();

      fixture.componentRef.setInput('active', false);
      fixture.detectChanges();

      expect(mediaWrapper.stop).toHaveBeenCalled();
    });

    it("should not play if active wasn't changed", () => {
      fixture.componentRef.setInput('active', false);
      fixture.detectChanges();

      fixture.componentRef.setInput('active', false);
      fixture.detectChanges();

      expect(mediaWrapper.play).not.toHaveBeenCalled();
    });
  });
});
