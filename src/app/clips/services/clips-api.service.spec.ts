import { TestBed } from '@angular/core/testing';

import { ClipsApiService } from './clips-api.service';

describe('ClipsApiService', () => {
  let service: ClipsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
