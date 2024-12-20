import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaTareasComponent } from './empresa-tareas.component';

describe('EmpresaTareasComponent', () => {
  let component: EmpresaTareasComponent;
  let fixture: ComponentFixture<EmpresaTareasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpresaTareasComponent]
    });
    fixture = TestBed.createComponent(EmpresaTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
