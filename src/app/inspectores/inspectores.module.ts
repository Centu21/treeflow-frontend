import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelInspectoresComponent } from './panel-inspectores/panel-inspectores.component';
import { CensarArbolComponent } from './censar-arbol/censar-arbol.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { PlantacionesComponent } from './plantaciones/plantaciones.component';
import { InspectoresRoutingModule } from './inspectores-routing.module';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PanelInspectoresComponent,
    CensarArbolComponent,
    MantenimientoComponent,
    PlantacionesComponent,
  ],
  imports: [
    CommonModule,
    InspectoresRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class InspectoresModule { }
