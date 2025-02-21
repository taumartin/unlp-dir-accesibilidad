import {ApiResponse} from './api-response';

export interface ApiErrorResponse<T = any> extends ApiResponse {
  error: T;
}
