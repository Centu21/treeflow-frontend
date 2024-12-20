import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelInspectoresComponent } from './panel-inspectores/panel-inspectores.component';
import { CensarArbolComponent } from './censar-arbol/censar-arbol.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { PlantacionesComponent } from './plantaciones/plantaciones.component';

const routes: Routes = [
    { path: 'panel-inspectores', component: PanelInspectoresComponent },
    { path: 'censar-arbol', component: CensarArbolComponent },
    { path: 'mantenimiento', component: MantenimientoComponent },
    { path: 'plantaciones', component: PlantacionesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InspectoresRoutingModule { }