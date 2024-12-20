import { Component, OnInit } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-empresa-tareas',
  templateUrl: './empresa-tareas.component.html',
  styleUrls: ['./empresa-tareas.component.css']
})
export class EmpresaTareasComponent implements OnInit {
  comunas: any[] = [];
  calles: any[] = [];
  tareas: any[] = [];
  items: any[] = [];
  estados: any[] = []; 
  tareaSeleccionada: any = null;
  foto: File | null = null;

  // Filtros dinámicos
  filtros = {
    comuna_id: '',
    calle_id: '',
    tarea_id: '',
    item_id: '',
    estado_id: '',
    fecha_limite: '',
  };


  constructor(private empresaService: EmpresaService, private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarOrdenes();
    this.cargarTareasListado();
    this.cargarItems();
    this.cargarEstados();
    this.cargarComunas();
    this.cargarCalles();
  }

 
  
  



  // Cargar tareas asignadas desde el servicio
  cargarOrdenes(): void {
    this.empresaService.obtenerOrdenesAsignadas().subscribe(
      (data: any[]) => {
        console.log('Datos recibidos:', data);
        this.tareas = data;
      },
      (error: any) => {
        console.error('Error al cargar tareas:', error);
      }
    );
  }
 


// Cargar comunas desde el servicio
cargarComunas(): void {
  this.empresaService.obtenerComunas().subscribe(
    (data) => (this.comunas = data),
    (error) => console.error('Error al cargar comunas:', error)
  );
}

// Cargar calles desde el servicio
cargarCalles(): void {
  this.empresaService.obtenerCalles().subscribe(
    (data) => (this.calles = data),
    (error) => console.error('Error al cargar calles:', error)
  );
}

cargarTareasListado(): void {
  this.empresaService.obtenerTareas().subscribe(
    (data: any[]) => {
      this.tareas = data;
      console.log('Tareas cargadas:', this.tareas);
    },
    (error: any) => {
      console.error('Error al cargar tareas:', error);
    }
  );
}
onTareaChange(): void {
  console.log('Tarea seleccionada:', this.filtros.tarea_id);
}




  // Cargar ítems desde el servicio
  cargarItems(): void {
    this.empresaService.obtenerItems().subscribe(
      (data: any[]) => {
        this.items = data;
      },
      (error: any) => {
        console.error('Error al cargar ítems:', error);
      }
    );
  }

  // Cargar estados desde el servicio
  cargarEstados(): void {
    this.empresaService.obtenerEstados().subscribe(
      (data: any[]) => {
        this.estados = data;
      },
      (error: any) => {
        console.error('Error al cargar estados:', error);
      }
    );
  }

  // Seleccionar una tarea para editar
  seleccionarTarea(tarea: any): void {
    this.tareaSeleccionada = { ...tarea };
    console.log('Tarea seleccionada para editar:', this.tareaSeleccionada);
    this.foto = null; // Resetear la foto seleccionada
  }

  // Manejar la selección de una foto
  onFotoSeleccionada(event: any): void {
    this.foto = event.target.files[0];
  }

  // Guardar los cambios de la tarea seleccionada
  guardarCambios(): void {
    if (!this.tareaSeleccionada) return;
  
    console.log('Tarea seleccionada:', this.tareaSeleccionada);
  
    // Preparar los datos a enviar
    const datos = {
      estado_id: Number(this.tareaSeleccionada.estado_id),
      arme: String(this.tareaSeleccionada.arme)
    };
  
    console.log('Datos enviados al backend:', datos);
  
    // Realizar la solicitud PUT al backend con el header 'Content-Type: application/json'
    this.http.put(`http://localhost:5000/api/ordenes-empresa/${this.tareaSeleccionada.orden_id}`, datos, {
      headers: { 'Content-Type': 'application/json' }
    }).subscribe(
      () => {
        alert(`Tarea actualizada a "${this.tareaSeleccionada.estado}".`);
        this.cargarOrdenes(); // Recargar la lista de tareas actualizadas
        this.tareaSeleccionada = null;
        this.foto = null;
      },
      (error: any) => {
        console.error('Error al actualizar la tarea:', error);
        alert('Error al actualizar la tarea. Inténtalo de nuevo.');
      }
    );
  }
  
  // Aplicar filtros
  aplicarFiltros(): void {
    console.log('Filtros aplicados:', this.filtros);
    this.empresaService.obtenerOrdenesFiltradas(this.filtros).subscribe(
      (data) => {
        this.tareas = data;
        console.log('Datos filtrados:', this.tareas);
      },
      (error) => {
        console.error('Error al aplicar los filtros:', error);
      }
    );
  }

  // Restablecer filtros
  restablecerFiltros(): void {
    this.filtros = {
      comuna_id: '',
      calle_id: '',
      tarea_id: '',
      item_id: '',
      estado_id: '',
      fecha_limite: '',
    };
    this.cargarOrdenes();
  }


  // Métodos para obtener nombres descriptivos
  getDescripcionTarea(tareaId: number): string {
    const tarea = this.tareas.find((t) => t.tarea_id === tareaId);
    return tarea?.tarea || 'Desconocido';
  }

  getDescripcionItem(itemId: number): string {
    const item = this.items.find((i) => i.id === itemId);
    return item?.descripcion || 'Desconocido';
  }

  getDescripcionEstado(estadoId: number | string): string {
    const estado = this.estados.find((e) => e.id === Number(estadoId));
    return estado?.nombre || 'Desconocido';
  }
}
