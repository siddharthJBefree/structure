import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorMethodNotAllowedComponent} from './error-method-not-allowed.component';

describe('ErrorMethodNotAllowedComponent', () => {
  let component: ErrorMethodNotAllowedComponent;
  let fixture: ComponentFixture<ErrorMethodNotAllowedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorMethodNotAllowedComponent]
    });
    fixture = TestBed.createComponent(ErrorMethodNotAllowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
