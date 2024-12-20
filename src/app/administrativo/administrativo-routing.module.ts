import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionOrdenesComponent } from './gestion-ordenes/gestion-ordenes.component';
import { MonitoreoTareasComponent } from './monitoreo-tareas/monitoreo-tareas.component';
import { VerArbolesComponent } from './ver-arboles/ver-arboles.component';

const routes: Routes = [

    { path: 'gestion-ordenes', component: GestionOrdenesComponent },
    { path: 'monitoreo-tareas', component: MonitoreoTareasComponent },
    { path: 'ver-arboles', component: VerArbolesComponent },
    

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdministrativoRoutingModule { }
