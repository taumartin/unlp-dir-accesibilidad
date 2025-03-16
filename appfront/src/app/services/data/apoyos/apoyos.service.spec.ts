import { TestBed } from '@angular/core/testing';

import { ApoyosService } from './apoyos.service';

describe('ApoyosService', () => {
  let service: ApoyosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApoyosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
