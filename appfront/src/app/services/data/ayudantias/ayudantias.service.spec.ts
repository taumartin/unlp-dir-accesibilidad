import { TestBed } from '@angular/core/testing';

import { AyudantiasService } from './ayudantias.service';

describe('AyudantiasService', () => {
  let service: AyudantiasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AyudantiasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
