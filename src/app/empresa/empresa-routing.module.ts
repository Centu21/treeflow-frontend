import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaTareasComponent } from './empresa-tareas/empresa-tareas.component';

const routes: Routes = [
  { path: 'tareas', component: EmpresaTareasComponent } // Ruta definida
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule {}
