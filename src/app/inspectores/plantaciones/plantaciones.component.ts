import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeflowService } from 'src/app/services/treeflow.service';

@Component({
  selector: 'app-plantaciones',
  templateUrl: './plantaciones.component.html',
  styleUrls: ['./plantaciones.component.css']
})
export class PlantacionesComponent implements OnInit {
  // Variables del formulario
  comuna: string = '';
  calle: string = '';
  altura: number | null = null;
  referencia: string = '';
  tipoPlantacion: string = '';
  especie: string = '';
  dimensionPlantera: string = '';
  observaciones: string = '';
  foto: File | null = null;

  // Datos dinámicos para los desplegables
  comunas: any[] = [];
  calles: any[] = [];
  referencias: any[] = [];
  tiposPlantacion: any[] = [];
  especies: any[] = [];
  dimensionesPlantera: any[] = [];

  constructor(private readonly router: Router, private readonly treeflowService: TreeflowService) {}

  ngOnInit(): void {
    // Cargar datos dinámicos para los desplegables
    this.loadSelectOptions();
  }

  // Método para cargar datos dinámicos
  private loadSelectOptions(): void {
    this.treeflowService.getComunas().subscribe(
      data => (this.comunas = data),
      error => console.error('Error al cargar comunas:', error)
    );

    this.treeflowService.getCalles().subscribe(
      data => (this.calles = data),
      error => console.error('Error al cargar calles:', error)
    );

    this.treeflowService.getReferencias().subscribe(
      data => (this.referencias = data),
      error => console.error('Error al cargar referencias:', error)
    );

    this.treeflowService.getTiposPlantacion().subscribe(
      data => (this.tiposPlantacion = data),
      error => console.error('Error al cargar tipos de plantación:', error)
    );

    this.treeflowService.getEspecies().subscribe(
      data => (this.especies = data),
      error => console.error('Error al cargar especies:', error)
    );

    this.treeflowService.getDimensionesPlantera().subscribe(
      data => (this.dimensionesPlantera = data),
      error => console.error('Error al cargar dimensiones plantera:', error)
    );
  }

  // Método para manejar la carga de la foto
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.foto = file;
    }
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    if (this.isFormValid()) {
      const formData = new FormData();
      formData.append('comuna_id', this.comuna);
      formData.append('calle_id', this.calle);
      formData.append('altura', this.altura?.toString() || '');
      formData.append('referencia_id', this.referencia);
      formData.append('tipo_plantacion_id', this.tipoPlantacion);
      formData.append('especie_id', this.especie);
      formData.append('dimension_plantera_id', this.dimensionPlantera);
      formData.append('observaciones', this.observaciones);
      if (this.foto) {
        formData.append('foto', this.foto, this.foto.name);
      }


      
    // Agregar console.log para verificar el contenido del FormData
    console.log('FormData antes de enviar:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });



      this.treeflowService.addPlantacion(formData).subscribe(
        response => {
          console.log('Plantación registrada exitosamente:', response);
          this.router.navigate(['/inspectores/panel-inspectores']); // Redirigir al panel de inspectores
        },
        error => {
          console.error('Error al registrar la plantación:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }







  // Validación básica del formulario
  private isFormValid(): boolean {
    return (
      this.comuna !== '' &&
      this.calle !== '' &&
      this.altura !== null &&
      this.referencia !== '' &&
      this.tipoPlantacion !== '' &&
      this.especie !== '' &&
      this.dimensionPlantera !== '' &&
      this.observaciones.length <= 300
    );
  }




}
