import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-monitoreo-tareas',
  templateUrl: './monitoreo-tareas.component.html',
  styleUrls: ['./monitoreo-tareas.component.css']
})
export class MonitoreoTareasComponent {


  constructor(private readonly router: Router) {}

  goToGestionOrdenes() {
    if (confirm('¿Deseas acceder a la Gestión de Órdenes?')) {
      this.router.navigate(['/administrativo/gestion-ordenes']);
    }
  }

  goToVerArboles() {
    if (confirm('¿Deseas acceder a Ver Árboles?')) {
      this.router.navigate(['/administrativo/ver-arboles']);
    }
  }





}
