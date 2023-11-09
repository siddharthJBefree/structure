import {HttpContextToken} from '@angular/common/http';

export class ApiConfig {
  loading?: boolean;
  hideSuccess?: boolean;
  hideError?: boolean;
  skipRetry?: boolean;
}

export const CONFIG_TOKEN = new HttpContextToken(() => {
  return new ApiConfig();
});
