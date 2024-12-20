import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panel-inspectores',
  templateUrl: './panel-inspectores.component.html',
  styleUrls: ['./panel-inspectores.component.css']
})
export class PanelInspectoresComponent {

  constructor(private readonly router: Router) {}

  
  goToCensarArbol() {
    if (confirm('¿Deseas censar un nuevo árbol?')) {
      this.router.navigate(['/inspectores/censar-arbol']);
    }
  }

  
  goToMantenimiento() {
    if (confirm('¿Deseas acceder al formulario de Mantenimiento?')) {
      this.router.navigate(['/inspectores/mantenimiento']);
    }
  }

  
  goToPlantaciones() {
    if (confirm('¿Deseas acceder al formulario de Plantaciones?')) {
      this.router.navigate(['/inspectores/plantaciones']);
    }
  }
}