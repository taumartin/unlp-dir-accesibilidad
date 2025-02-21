import {ApiResponse} from './api-response';

export interface ApiSuccessResponse<T = any> extends ApiResponse {
  data: T;
}
