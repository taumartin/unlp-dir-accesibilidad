import { TestBed } from '@angular/core/testing';

import { TiposEventosService } from './tipos-eventos.service';

describe('TiposEventosService', () => {
  let service: TiposEventosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TiposEventosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
