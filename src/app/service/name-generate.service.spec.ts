import { TestBed } from '@angular/core/testing';

import { NameGenerateService } from './name-generate.service';

describe('NameGenerateService', () => {
  let service: NameGenerateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameGenerateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
