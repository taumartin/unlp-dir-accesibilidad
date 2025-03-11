import {Injectable} from '@angular/core';
import {ApiService} from '../../network/api/api.service';
import {Observable} from 'rxjs';
import {ApiResponsePage} from '../../network/api/api-response-page';
import {ApiPageRequest} from '../../network/api/api-page-request';
import {ApiSuccessResponse} from '../../network/api/api-success-response';
import {ApiErrorResponse} from '../../network/api/api-error-response';
import {Model} from '../../../models/model';

@Injectable({
  providedIn: 'root'
})
export abstract class CrudService<T extends Model> {
  protected constructor(
    private readonly apiService: ApiService,
    private readonly baseEndpoint: string,
  ) {
  }

  public listAll(pageRequested: ApiPageRequest): Observable<ApiResponsePage<T>> {
    return this.apiService.getPaginatedEndpoint<T>(`${this.baseEndpoint}/`, pageRequested);
  }

  public getById(id: number): Observable<ApiSuccessResponse<T> | ApiErrorResponse> {
    return this.apiService.getEndpoint<ApiSuccessResponse<T>>(`${this.baseEndpoint}/${id}`);
  }

  public create(model: Omit<T, 'id'>): Observable<ApiSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse>(`${this.baseEndpoint}/`, model);
  }

  public update(id: number, model: Partial<Omit<T, 'id'>>): Observable<ApiSuccessResponse | ApiErrorResponse> {
    return this.apiService.postEndpoint<ApiSuccessResponse>(`${this.baseEndpoint}/${id}`, model);
  }

  public delete(id: number): Observable<ApiSuccessResponse | ApiErrorResponse> {
    return this.apiService.deleteEndpoint<ApiSuccessResponse>(`${this.baseEndpoint}/${id}`);
  }

  public abstract isModified(original: T, newValues: Partial<Omit<T, 'id'>>): boolean;
}
