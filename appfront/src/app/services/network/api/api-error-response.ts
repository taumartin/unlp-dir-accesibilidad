import {ApiResponse} from './api-response';

export interface ApiErrorResponse<T = any> extends ApiResponse {
  success: false;
  error: T;
}
