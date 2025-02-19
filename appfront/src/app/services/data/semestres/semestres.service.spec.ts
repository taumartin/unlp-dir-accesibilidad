import { TestBed } from '@angular/core/testing';

import { SemestresService } from './semestres.service';

describe('SemestresService', () => {
  let service: SemestresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemestresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
