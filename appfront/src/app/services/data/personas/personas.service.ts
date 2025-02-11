import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Persona} from '../../../models/persona';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {
  private readonly baseEndpoint: string = "/personas";

  constructor(
    private readonly apiService: ApiService,
  ) {
  }

  public getPersonas(): Observable<Persona[]> {
    return this.apiService.getEndpoint<Persona[]>(`${this.baseEndpoint}/`);
  }

  // TODO: agregar resto de operaciones..
}
