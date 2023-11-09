import {TestBed} from '@angular/core/testing';
import {CanDeactivateFn} from '@angular/router';

import {routeChangeGuard} from './route-change.guard';

describe('routeChangeGuard', () => {
  const executeGuard: CanDeactivateFn = (...guardParameters) => TestBed.runInInjectionContext(() => routeChangeGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
