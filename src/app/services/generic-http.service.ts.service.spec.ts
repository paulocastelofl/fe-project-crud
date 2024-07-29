import { TestBed } from '@angular/core/testing';

import { GenericHttpServiceTsService } from './generic-http.service.ts.service';

describe('GenericHttpServiceTsService', () => {
  let service: GenericHttpServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericHttpServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
