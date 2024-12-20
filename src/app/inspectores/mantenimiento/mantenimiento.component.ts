import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeflowService } from 'src/app/services/treeflow.service';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit {
  // Variables para campos del formulario
  comunas: any[] = [];
  calles: any[] = [];
  referencias: any[] = [];
  especies: any[] = [];
  arbolesFiltrados: any[] = [];
  tareas: any[] = [];
  items: any[] = [];

  // Datos del formulario
  comuna: string = '';
  calle: string = '';
  altura: number | null = null;
  referencia: string = '';
  especie: string = '';
  selectedArbol: string = '';
  tarea: string = '';
  item: string = '';
  observaciones: string = '';
  foto: File | null = null;

  constructor(private treeflowService: TreeflowService, private router: Router) {}

  ngOnInit(): void {
    this.loadDropdownData();
  }

  // Cargar datos para los desplegables
  loadDropdownData(): void {
    this.treeflowService.getComunas().subscribe(data => this.comunas = data);
    this.treeflowService.getCalles().subscribe(data => this.calles = data);
    this.treeflowService.getReferencias().subscribe(data => this.referencias = data);
    this.treeflowService.getEspecies().subscribe(data => this.especies = data);
    this.treeflowService.getTiposTarea().subscribe(data => this.tareas = data);
    this.treeflowService.getItems().subscribe(data => this.items = data);
  }

  // Manejar selección de archivo
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.foto = file;
    }
  }

  // Manejar cambios en los filtros
  onFilterChange(): void {
    const filters = {
      comuna_id: this.comuna ? parseInt(this.comuna, 10) : undefined,
      calle_id: this.calle ? parseInt(this.calle, 10) : undefined,
      altura: this.altura ? this.altura : undefined,
      referencia_id: this.referencia ? parseInt(this.referencia, 10) : undefined,
      especie_id: this.especie ? parseInt(this.especie, 10) : undefined,
    };
  
    this.treeflowService.filterArboles(filters).subscribe(
      (data) => {
        console.log('Árboles filtrados:', data);
        this.arbolesFiltrados = data;
      },
      (error) => {
        console.error('Error al filtrar árboles:', error);
      }
    );
  }
  
  
  
  
  























  

  // Validar formulario
  isFormValid(): boolean {
    return Boolean(
      this.comuna &&
      this.calle &&
      this.altura !== null &&
      this.referencia &&
      this.especie &&
      this.tarea &&
      this.item
    );
  }

  // Manejar envío del formulario
  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('arbol_id', this.selectedArbol.toString());
      formData.append('tarea_id', this.tarea.toString());
      formData.append('item_id', this.item.toString());
      formData.append('observaciones', this.observaciones || '');
      if (this.foto) {
        formData.append('foto', this.foto, this.foto.name);
      }

      this.treeflowService.addMantenimiento(formData).subscribe(
        (response) => {
          console.log('Mantenimiento registrado exitosamente:', response);
          this.router.navigate(['/inspectores/panel-inspectores']); // Redirigir al panel de inspectores
        },
        (error) => {
          console.error('Error al registrar el mantenimiento:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}
