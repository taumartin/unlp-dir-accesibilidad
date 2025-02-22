import {ApiResponse} from './api-response';

export interface ApiSuccessResponse<T = any> extends ApiResponse {
  success: true;
  data: T;
}
