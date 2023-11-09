import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ErrorInternalServerComponent} from './error-internal-server.component';

describe('ErrorInternalServerComponent', () => {
  let component: ErrorInternalServerComponent;
  let fixture: ComponentFixture<ErrorInternalServerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorInternalServerComponent]
    });
    fixture = TestBed.createComponent(ErrorInternalServerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
