import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerArbolesComponent } from './ver-arboles.component';

describe('VerArbolesComponent', () => {
  let component: VerArbolesComponent;
  let fixture: ComponentFixture<VerArbolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerArbolesComponent]
    });
    fixture = TestBed.createComponent(VerArbolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
