import { TestBed } from '@angular/core/testing';

import { PrestameApi } from './prestame-api';

describe('PrestameApi', () => {
  let service: PrestameApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestameApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
