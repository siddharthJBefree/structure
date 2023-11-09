import {ResolveFn} from '@angular/router';

export const headerMenuResolver: ResolveFn<boolean> = (route, state) => {
  return true;
};
