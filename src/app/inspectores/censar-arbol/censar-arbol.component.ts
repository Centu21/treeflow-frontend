
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TreeflowService } from 'src/app/services/treeflow.service';


@Component({
  selector: 'app-censar-arbol',
  templateUrl: './censar-arbol.component.html',
  styleUrls: ['./censar-arbol.component.css']
})
export class CensarArbolComponent implements OnInit {
  // Variables del formulario
  comuna: string = '';
  calle: string = '';
  altura: number | null = null;
  referencia: string = '';
  especie: string = '';
  alturaArbol: number | null = null;
  dap: number | null = null;
  estadoFitosanitario: string = '';
  faseVital: string = '';
  inclinacion: string = '';
  ahuecamiento: string = '';
  estadoPlantera: string = '';
  anchoAcera: string = '';
  observaciones: string = '';
  foto: File | null = null;


  // Datos dinámicos para los desplegables
  comunas: any[] = [];
  calles: any[] = [];
  referencias: any[] = [];
  especies: any[] = [];
  estadosFitosanitarios: any[] = [];
  fasesVitales: any[] = [];
  inclinaciones: any[] = [];
  ahuecamientos: any[] = [];
  estadosPlantera: any[] = [];
  anchosAcera: any[] = [];


  constructor(
    private readonly router: Router,
    private readonly treeflowService: TreeflowService
  ) {}


  ngOnInit(): void {
    this.loadSelectOptions();
  }


  // Método para cargar datos de los desplegables
  loadSelectOptions(): void {
    this.treeflowService.getComunas().subscribe(
      data => this.comunas = data,
      error => console.error('Error al cargar comunas:', error)
    );


    this.treeflowService.getCalles().subscribe(
      data => this.calles = data,
      error => console.error('Error al cargar calles:', error)
    );


    this.treeflowService.getReferencias().subscribe(
      data => this.referencias = data,
      error => console.error('Error al cargar referencias:', error)
    );


    this.treeflowService.getEspecies().subscribe(
      data => this.especies = data,
      error => console.error('Error al cargar especies:', error)
    );


    this.treeflowService.getEstadosFitosanitarios().subscribe(
      data => this.estadosFitosanitarios = data,
      error => console.error('Error al cargar estados fitosanitarios:', error)
    );


    this.treeflowService.getFasesVitales().subscribe(
      data => this.fasesVitales = data,
      error => console.error('Error al cargar fases vitales:', error)
    );


    this.treeflowService.getInclinaciones().subscribe(
      data => this.inclinaciones = data,
      error => console.error('Error al cargar inclinaciones:', error)
    );


    this.treeflowService.getAhuecamientos().subscribe(
      data => this.ahuecamientos = data,
      error => console.error('Error al cargar ahuecamientos:', error)
    );


    this.treeflowService.getEstadosPlantera().subscribe(
      data => this.estadosPlantera = data,
      error => console.error('Error al cargar estados plantera:', error)
    );


    this.treeflowService.getAnchosAceras().subscribe(
      data => this.anchosAcera = data,
      error => console.error('Error al cargar ancho acera:', error)
    );
  }


  // Método para manejar la selección de archivos
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
      formData.append('especie_id', this.especie);
      formData.append('altura_arbol', this.alturaArbol?.toString() || '');
      formData.append('dap', this.dap?.toString() || '');
      formData.append('estado_fitosanitario_id', this.estadoFitosanitario);
      formData.append('fase_vital_id', this.faseVital);
      formData.append('inclinacion_id', this.inclinacion);
      formData.append('ahuecamiento_id', this.ahuecamiento);
      formData.append('estado_plantera_id', this.estadoPlantera);
      formData.append('ancho_acera_id', this.anchoAcera);
      formData.append('observaciones', this.observaciones);
      if (this.foto) {
        formData.append('foto', this.foto, this.foto.name);
      }


      

    // Agregar console.log para verificar el contenido del FormData
    console.log('FormData antes de enviar:');
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });



      this.treeflowService.addArbol(formData).subscribe(
        response => {
          console.log('Árbol censado exitosamente:', response);
          this.router.navigate(['/inspectores/panel-inspectores']);
        },
        error => {
          console.error('Error al censar árbol:', error);
        }
      );
    } else {
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }


  // Validación básica del formulario
  isFormValid(): boolean {
    return (
      this.comuna !== '' &&
      this.calle !== '' &&
      this.altura !== null &&
      this.altura.toString().length <= 6 &&
      this.referencia !== '' &&
      this.especie !== '' &&
      this.alturaArbol !== null &&
      this.alturaArbol.toString().length <= 2 &&
      this.dap !== null &&
      this.dap.toString().length <= 4 &&
      this.estadoFitosanitario !== '' &&
      this.faseVital !== '' &&
      this.inclinacion !== '' &&
      this.ahuecamiento !== '' &&
      this.estadoPlantera !== '' &&
      this.anchoAcera !== '' &&
      this.observaciones.length <= 300
    );
  }
}




