import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelInspectoresComponent } from './panel-inspectores.component';

describe('PanelInspectoresComponent', () => {
  let component: PanelInspectoresComponent;
  let fixture: ComponentFixture<PanelInspectoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanelInspectoresComponent]
    });
    fixture = TestBed.createComponent(PanelInspectoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
