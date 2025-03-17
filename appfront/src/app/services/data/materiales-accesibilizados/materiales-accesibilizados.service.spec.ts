import { TestBed } from '@angular/core/testing';

import { MaterialesAccesibilizadosService } from './materiales-accesibilizados.service';

describe('MaterialesAccesibilizadosService', () => {
  let service: MaterialesAccesibilizadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialesAccesibilizadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
