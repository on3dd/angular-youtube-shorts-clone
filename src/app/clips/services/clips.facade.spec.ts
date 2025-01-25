import { TestBed } from '@angular/core/testing';

import { ClipsFacade } from './clips.facade';

describe('ClipsService', () => {
  let service: ClipsFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipsFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
