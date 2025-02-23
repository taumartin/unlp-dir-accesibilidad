import {ApiErrorResponse} from './api-error-response';

export interface ApiValidationErrorResponseFields {
  fields: {
    [key: string]: {
      type: "field" | "alternative" | "alternative_grouped" | "unknown_fields";
      value: any;
      msg: string;
      path: string;
      location: 'body' | 'cookies' | 'headers' | 'params' | 'query';
    };
  }
}

export function isApiValidationErrorResponseFields(obj: any): obj is ApiValidationErrorResponseFields {
  return obj && (typeof obj === 'object') && ('fields' in obj) && (typeof obj.fields === 'object');
}

export interface ApiValidationErrorResponse extends ApiErrorResponse<ApiValidationErrorResponseFields> {
}
