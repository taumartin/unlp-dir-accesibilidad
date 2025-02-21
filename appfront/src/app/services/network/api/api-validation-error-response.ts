export interface ApiValidationErrorResponse {
  fields: {
    [key: string]: {
      type: "field" | "alternative" | "alternative_grouped" | "unknown_fields";
      value: any;
      msg: string;
      path: string;
      location: 'body' | 'cookies' | 'headers' | 'params' | 'query';
    },
  };
}
