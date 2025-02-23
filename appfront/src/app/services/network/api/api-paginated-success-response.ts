import {ApiSuccessResponse} from './api-success-response';
import {ApiResponsePage} from './api-response-page';

export type ApiPaginatedSuccessResponse<T> = ApiSuccessResponse<ApiResponsePage<T>>;
