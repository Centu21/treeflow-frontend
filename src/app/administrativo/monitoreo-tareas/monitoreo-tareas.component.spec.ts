import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitoreoTareasComponent } from './monitoreo-tareas.component';

describe('MonitoreoTareasComponent', () => {
  let component: MonitoreoTareasComponent;
  let fixture: ComponentFixture<MonitoreoTareasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonitoreoTareasComponent]
    });
    fixture = TestBed.createComponent(MonitoreoTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
