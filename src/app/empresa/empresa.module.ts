import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { EmpresaRoutingModule } from './empresa-routing.module';
import { EmpresaTareasComponent } from './empresa-tareas/empresa-tareas.component';
import { SharedModule } from '../shared/shared.module';





@NgModule({
  declarations: [
    EmpresaTareasComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule, 
    EmpresaRoutingModule,
    SharedModule,
  ]
})
export class EmpresaModule { }
