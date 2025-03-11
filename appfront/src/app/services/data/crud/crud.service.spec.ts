import {TestBed} from '@angular/core/testing';
import {CrudService} from './crud.service';
import {Model} from '../../../models/model';

describe('CrudService', () => {
  let service: CrudService<Model>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
