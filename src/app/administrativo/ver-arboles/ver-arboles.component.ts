import { Component, OnInit } from '@angular/core';
import { AdministrativoService } from '../../services/administrativo.service';

@Component({
  selector: 'app-ver-arboles',
  templateUrl: './ver-arboles.component.html',
  styleUrls: ['./ver-arboles.component.css']
})
export class VerArbolesComponent implements OnInit {
  // Propiedades para almacenar los datos
  arboles: any[] = []; // Lista principal de árboles censados
  comunas: any[] = []; // Lista de comunas
  calles: any[] = []; // Lista de calles
  especies: any[] = []; // Lista de especies
  estadosFitosanitarios: any[] = []; // Lista de estados fitosanitarios
  arbolSeleccionado: any = null; // Para almacenar el árbol seleccionado
  mostrarDetalles: boolean = false; // Controla la visualización del modal

  // Filtros dinámicos
  filtros = {
    comuna_id: null,
    calle_id: null,
    especie_id: null,
    estado_fitosanitario_id: null,
    nivel_inclinaciones_id: null,
    nivel_ahuecamientos_id: null
  };

  constructor(private administrativoService: AdministrativoService) {}

  ngOnInit(): void {
    this.cargarComunas();
    this.cargarCalles();
    this.cargarEspecies();
    this.cargarEstadosFitosanitarios();
    this.cargarArboles(); // Cargar datos iniciales sin filtros
  }

  // Método para cargar los datos iniciales de árboles censados
  cargarArboles(): void {
    this.administrativoService.getArbolesCensados(this.filtros).subscribe(
      (data) => {
        console.log('Datos de árboles censados:', data);
        this.arboles = data;
      },
      (error) => {
        console.error('Error al cargar los árboles censados:', error);
      }
    );
  }

  // Método para cargar las comunas
  cargarComunas(): void {
    this.administrativoService.getComunas().subscribe(
      (data) => {
        this.comunas = data;
      },
      (error) => {
        console.error('Error al cargar las comunas:', error);
      }
    );
  }

  // Método para cargar las calles
  cargarCalles(): void {
    this.administrativoService.getCalles().subscribe(
      (data) => {
        this.calles = data;
      },
      (error) => {
        console.error('Error al cargar las calles:', error);
      }
    );
  }

  // Método para cargar las especies
  cargarEspecies(): void {
    this.administrativoService.getEspecies().subscribe(
      (data) => {
        this.especies = data;
      },
      (error) => {
        console.error('Error al cargar las especies:', error);
      }
    );
  }
  
  // Método para cargar los estados fitosanitarios
  cargarEstadosFitosanitarios(): void {
    this.administrativoService.getEstadosFitosanitarios().subscribe(
      (data) => {
        this.estadosFitosanitarios = data;
      },
      (error) => {
        console.error('Error al cargar los estados fitosanitarios:', error);
      }
    );
  }

  // Método para aplicar filtros dinámicos
  aplicarFiltros(): void {
    console.log('Aplicando filtros:', this.filtros);
    this.cargarArboles(); // Recargar la tabla con los filtros aplicados
  }

  // Método para restablecer los filtros y recargar la tabla
  restablecerFiltros(): void {
    this.filtros = {
      comuna_id: null,
      calle_id: null,
      especie_id: null,
      estado_fitosanitario_id: null,
      nivel_inclinaciones_id: null,
      nivel_ahuecamientos_id: null
    };
    this.cargarArboles(); // Recargar la tabla sin filtros
  }


  verDetalles(arbol: any): void {
    this.administrativoService.getMantenimientosOrdenes().subscribe(
      (data) => {
        const mantenimientos = data.filter((mantenimiento) => mantenimiento.arbol_id === arbol.id);
  
        this.arbolSeleccionado = {
          ...arbol,
          foto: mantenimientos.length > 0 && mantenimientos[0].foto ? mantenimientos[0].foto : 'assets/images/default-image.jpeg',
          mantenimientos: mantenimientos
        };
  
        this.mostrarDetalles = true;
      },
      (error) => {
        console.error('Error al cargar los detalles del árbol:', error);
      }
    );
  }
  
  
  cerrarDetalles(): void {
    this.mostrarDetalles = false;
    this.arbolSeleccionado = null;
  }
  









}
