import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorRequestTimeoutComponent} from './error-request-timeout.component';

describe('ErrorRequestTimeoutComponent', () => {
  let component: ErrorRequestTimeoutComponent;
  let fixture: ComponentFixture<ErrorRequestTimeoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorRequestTimeoutComponent]
    });
    fixture = TestBed.createComponent(ErrorRequestTimeoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
