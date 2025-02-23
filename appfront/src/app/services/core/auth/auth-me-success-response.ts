import {ApiSuccessResponse} from '../../network/api/api-success-response';

export type AuthMeSuccessResponse = ApiSuccessResponse<{
  displayName: string;
  profilePhoto: string | null;
}>;
