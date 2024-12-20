import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAccessComponent } from './request-access.component';

describe('RequestAccessComponent', () => {
  let component: RequestAccessComponent;
  let fixture: ComponentFixture<RequestAccessComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequestAccessComponent]
    });
    fixture = TestBed.createComponent(RequestAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
