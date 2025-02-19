import { TestBed } from '@angular/core/testing';

import { MediosComunicacionService } from './medios-comunicacion.service';

describe('MediosComunicacionService', () => {
  let service: MediosComunicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediosComunicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
