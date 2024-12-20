import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CensarArbolComponent } from './censar-arbol.component';

describe('CensarArbolComponent', () => {
  let component: CensarArbolComponent;
  let fixture: ComponentFixture<CensarArbolComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CensarArbolComponent]
    });
    fixture = TestBed.createComponent(CensarArbolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
