import { Component, OnInit } from '@angular/core';
import { AdministrativoService } from '../../services/administrativo.service';
import { DatePipe } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-gestion-ordenes',
  templateUrl: './gestion-ordenes.component.html',
  styleUrls: ['./gestion-ordenes.component.css'],
})
export class GestionOrdenesComponent implements OnInit {
  comunas: any[] = []; 
  calles: any[] = [];  
  ordenes: any[] = []; 
  estados: any[] = []; 
  contratistas: any[] = []; 
  tareas: any[] = []; 
  items: any[] = []; 
  ordenSeleccionada: any = null; 
  mantenimientos: any[] = [];
  mantenimientoSeleccionado: any = null; 
  fotoSeleccionada: string | null = null;

  
  filtros = {
    comuna_id: '',
    calle_id: '',
    tarea_id: '',
    estado_id: '',
    contratista_id: '',
    item_id: '',
    fecha_limite: '',
  };
  mostrarModalFoto: boolean | undefined;


  constructor(private readonly administrativoService: AdministrativoService, private readonly datePipe: DatePipe, private readonly cdr: ChangeDetectorRef) {}
    

  ngOnInit(): void {
    this.cargarComunas();
    this.cargarCalles();
    this.cargarDatosCombinados();
    this.cargarOrdenes();
    this.cargarEstados();
    this.cargarContratistas();
    this.cargarTareas();
    this.cargarItems();
    this.cargarMantenimientos();
  }


//  datos combinados de mante y ARMES
cargarDatosCombinados(): void {
  this.administrativoService.getMantenimientosOrdenes().subscribe(
    (data) => {
      console.log('Datos combinados:', data); 
      this.mantenimientos = data.map(item => ({
        ...item,
        id: item.mantenimiento_id 
      }));
      this.cdr.detectChanges();
    },
    (error) => console.error('Error al cargar los datos combinados:', error)
  );
}



cargarComunas(): void {
  this.administrativoService.getComunas().subscribe(
    (data) => (this.comunas = data),
    (error) => console.error('Error al cargar las comunas:', error)
  );
}

cargarCalles(): void {
  this.administrativoService.getCalles().subscribe(
    (data) => (this.calles = data),
    (error) => console.error('Error al cargar las calles:', error)
  );
}


 
  cargarOrdenes(): void {
    this.administrativoService.getOrdenes().subscribe(
      (data) => (this.ordenes = data),
      (error) => console.error('Error al cargar las órdenes:', error)
    );
  }

  cargarEstados(): void {
    this.administrativoService.getEstados().subscribe(
      (data) => (this.estados = data),
      (error) => console.error('Error al cargar los estados:', error)
    );
  }

  cargarContratistas(): void {
    this.administrativoService.getContratistas().subscribe(
      (data) => (this.contratistas = data),
      (error) => console.error('Error al cargar los contratistas:', error)
    );
  }

  
  cargarTareas(): void {
    this.administrativoService.getTareas().subscribe(
      (data) => (this.tareas = data),
      (error) => console.error('Error al cargar las tareas:', error)
    );
  }

  
  cargarItems(): void {
    this.administrativoService.getItems().subscribe(
      (data) => (this.items = data),
      (error) => console.error('Error al cargar los ítems:', error)
    );
  }

aplicarFiltros(): void {
  const { comuna_id, calle_id, tarea_id, item_id, estado_id, contratista_id, fecha_limite } = this.filtros;

  this.administrativoService.getOrdenesFiltradas(
    comuna_id,
    calle_id,
    tarea_id,
    item_id,
    estado_id,
    contratista_id,
    fecha_limite
    
  ).subscribe(
    (data) => {
      this.mantenimientos = data;
      console.log('Datos filtrados:', this.mantenimientos);
    },
    (error) => {
      console.error('Error al aplicar los filtros:', error);
    }
  );
}


  
  cargarMantenimientos(): void {
    this.administrativoService.getOrdenes().subscribe(
      (data) => (this.mantenimientos = data),
      (error) => console.error('Error al cargar los mantenimientos:', error)
    );
  }

  
  seleccionarMantenimiento(mantenimiento: any): void {
    console.log('Mantenimiento seleccionado:', mantenimiento);
    this.mantenimientoSeleccionado = { ...mantenimiento };
  }
  



  
  seleccionarOrden(orden: any): void {
    this.ordenSeleccionada = { ...orden }; 
  }

  

  

  // PENDIENTE! : armar la logica de notificacion
  enviarNotificacionContratista(contratistaId: number): void {
    console.log(`Notificación enviada a la contratista con ID: ${contratistaId}`);
    
  }


  
  verFoto(fotoUrl: string): void {
    this.fotoSeleccionada = fotoUrl;
    this.mostrarModalFoto = true;
  
  }
  
  
    
  cerrarFoto(): void {
    this.fotoSeleccionada = null;
    this.mostrarModalFoto = false;
    
  }



  restablecerFiltros(): void {
   this.filtros = {
    comuna_id: '',
    calle_id: '',
    tarea_id: '',
    item_id: '',
    estado_id: '',
    contratista_id: '',
    fecha_limite: ''
  };
  this.cargarDatosCombinados();
}


guardarCambios(): void {
  if (this.mantenimientoSeleccionado) {
    console.log('Datos a guardar:', this.mantenimientoSeleccionado);

    const fecha = new Date(this.mantenimientoSeleccionado.fecha_limite);
    fecha.setMinutes(fecha.getMinutes() + fecha.getTimezoneOffset());

    const datosGuardar = {
      mantenimiento_id: Number(this.mantenimientoSeleccionado.mantenimiento_id),
      estado_id: Number(this.mantenimientoSeleccionado.estado_id),
      arme: this.mantenimientoSeleccionado.arme ? Number(this.mantenimientoSeleccionado.arme) : null,
      contratista_id: Number(this.mantenimientoSeleccionado.contratista_id),
      fecha_limite: this.datePipe.transform(this.mantenimientoSeleccionado.fecha_limite, 'yyyy-MM-dd')
    };

    console.log('Datos a enviar:', datosGuardar);

    if (!this.mantenimientoSeleccionado.orden_id) {
      // Crear nueva orden (POST)
      this.administrativoService.createOrden(datosGuardar).subscribe(
        (respuesta) => {
          console.log('Orden creada:', respuesta);
          if (respuesta.success) {
            // Asignar el nuevo orden_id al mantenimientoSeleccionado
            this.mantenimientoSeleccionado.orden_id = respuesta.data.id;
            this.cargarDatosCombinados();
            this.restablecerFiltros();
            this.mantenimientoSeleccionado = null;
          } else {
            alert(respuesta.message); // Mostrar mensaje desde el backend
          }
        },
        (error) => {
          console.error('Error al crear la orden:', error);
          alert('Error al crear la orden: ' + error.message);
        }
      );
    } else {
      // Actualizar orden existente (PUT)
      this.administrativoService.updateOrden(this.mantenimientoSeleccionado.orden_id, datosGuardar).subscribe(
        (respuesta) => {
          console.log('Orden actualizada:', respuesta);
          if (respuesta.success) {
            this.cargarDatosCombinados();
            this.restablecerFiltros();
            this.mantenimientoSeleccionado = null;
          } else {
            alert(respuesta.message); // Mostrar mensaje desde el backend
          }
        },
        (error) => {
          console.error('Error al actualizar la orden:', error);
          alert('Error al actualizar la orden: ' + error.message);
        }
      );
    }
  } else {
    console.error('No se seleccionó un mantenimiento para guardar.');
  }
}





  }
  














