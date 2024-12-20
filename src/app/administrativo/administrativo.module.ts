import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdministrativoRoutingModule } from './administrativo-routing.module';
import { GestionOrdenesComponent } from './gestion-ordenes/gestion-ordenes.component';
import { MonitoreoTareasComponent } from './monitoreo-tareas/monitoreo-tareas.component';
import { VerArbolesComponent } from './ver-arboles/ver-arboles.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    GestionOrdenesComponent,
    MonitoreoTareasComponent,
    VerArbolesComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    AdministrativoRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    MatInputModule,
    SharedModule,

  ]
})
export class AdministrativoModule { }
