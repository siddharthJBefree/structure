import {CanDeactivateFn} from '@angular/router';

export const routeChangeGuard: CanDeactivateFn<unknown> = (component, currentRoute, currentState, nextState) => {
  return true;
};
