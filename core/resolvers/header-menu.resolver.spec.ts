import {TestBed} from '@angular/core/testing';
import {ResolveFn} from '@angular/router';

import {headerMenuResolver} from './header-menu.resolver';

describe('headerMenuResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) =>
    TestBed.runInInjectionContext(() => headerMenuResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
