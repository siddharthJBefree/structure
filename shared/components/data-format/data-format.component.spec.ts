import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DataFormatComponent} from './data-format.component';

describe('DataFormatComponent', () => {
  let component: DataFormatComponent;
  let fixture: ComponentFixture<DataFormatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataFormatComponent]
    });
    fixture = TestBed.createComponent(DataFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
