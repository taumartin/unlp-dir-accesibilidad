import { TestBed } from '@angular/core/testing';

import { TutoresTrabajosEnMaterialesService } from './tutores-trabajos-en-materiales.service';

describe('TutoresTrabajosEnMaterialesService', () => {
  let service: TutoresTrabajosEnMaterialesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TutoresTrabajosEnMaterialesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
