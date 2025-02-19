import { TestBed } from '@angular/core/testing';

import { TiposMaterialesService } from './tipos-materiales.service';

describe('TiposMaterialesService', () => {
  let service: TiposMaterialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposMaterialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
