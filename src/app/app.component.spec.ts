import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ToastsFacade } from './toasts/state/toasts.facade';

// Mock the problematic imports
jest.mock('media-chrome', () => ({}));
jest.mock('hls-video-element', () => ({}));
jest.mock('dash-video-element', () => ({}));

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: ToastsFacade, useValue: {} }],
      imports: [AppComponent, RouterModule.forRoot([])],
    }).compileComponents();
  });

  it(`should have as title 'angular-shorts-clone'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('angular-shorts-clone');
  });
});
