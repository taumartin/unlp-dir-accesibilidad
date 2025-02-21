import {ApiSuccessResponse} from '../../network/api/api-success-response';

export type AuthLoginSuccessResponse = ApiSuccessResponse<{
  accessToken: string;
}>;
