import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdministrativoService {
  private baseUrlOrdenes: string = 'http://localhost:5000/api/ordenes'; // URL base para las órdenes
  private baseUrlArboles: string = 'http://localhost:5000/api/arboles-censados'; // URL base para árboles censados
  private baseUrlMantenimientosOrdenes: string = 'http://localhost:5000/api/mantenimientos-ordenes';


  constructor(private http: HttpClient) {}

  // Obtener todas las órdenes
  getOrdenes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlOrdenes);
  }

  // Actualizar una orden existente
  updateOrden(id: number, orden: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrlOrdenes}/${id}`, orden);
  }

  // Eliminar una orden
  deleteOrden(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrlOrdenes}/${id}`);
  }



  // Crear una nueva orden
  createOrden(orden: any): Observable<any> {
    return this.http.post<any>(this.baseUrlOrdenes, orden);
  }





  // Obtener datos de los estados
  getEstados(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/estados');
  }

  // Obtener datos de los contratistas
  getContratistas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/contratistas');
  }

  // Obtener datos de las tareas
  getTareas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/tareas');
  }

  // Obtener datos de los ítems
  getItems(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/items');
  }





  // Obtener datos combinados de mantenimientos y órdenes
  getMantenimientosOrdenes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/mantenimientos-ordenes');
  }





  // Obtener comunas
  getComunas(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/comunas');
  }

  // Obtener calles
  getCalles(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/calles');
  }

  // Obtener especies
  getEspecies(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/especies');
  }

  // Obtener árboles filtrados
  getArbolesFiltrados(params: any): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5000/api/arboles-filtrados', { params });
  }

  

  getArbolesCensados(filtros: {
    comuna_id?: number | null;
    calle_id?: number | null;
    especie_id?: number | null;
    estado_fitosanitario_id?: number | null;
    nivel_inclinaciones_id?: number | null;
    nivel_ahuecamientos_id?: number | null;
  }): Observable<any[]> {
    let params = new HttpParams();

    // Agregar filtros dinámicos solo si tienen valor
    if (filtros.comuna_id) {
      params = params.set('comuna_id', filtros.comuna_id.toString());
    }
    if (filtros.calle_id) {
      params = params.set('calle_id', filtros.calle_id.toString());
    }
    if (filtros.especie_id) {
      params = params.set('especie_id', filtros.especie_id.toString());
    }
    if (filtros.estado_fitosanitario_id) {
      params = params.set('estado_fitosanitario_id', filtros.estado_fitosanitario_id.toString());
    }
    if (filtros.nivel_inclinaciones_id) {
      params = params.set('nivel_inclinaciones_id', filtros.nivel_inclinaciones_id.toString());
    }
    if (filtros.nivel_ahuecamientos_id) {
      params = params.set('nivel_ahuecamientos_id', filtros.nivel_ahuecamientos_id.toString());
    }

    return this.http.get<any[]>(this.baseUrlArboles, { params });
  }



// Obtener órdenes filtradas con los nuevos parámetros
getOrdenesFiltradas(
  comuna_id?: string,
  calle_id?: string,
  tarea_id?: string,
  item_id?: string,
  estado_id?: string,
  contratista_id?: string,
  fecha_limite?: string
  
  
): Observable<any[]> {
  const params: any = {};
  if (comuna_id) params.comuna_id = comuna_id;
  if (calle_id) params.calle_id = calle_id;
  if (tarea_id) params.tarea_id = tarea_id;
  if (item_id) params.item_id = item_id;
  if (estado_id) params.estado_id = estado_id;
  if (contratista_id) params.contratista_id = contratista_id;
  if (fecha_limite) params.fecha_limite = fecha_limite;
  

  return this.http.get<any[]>('http://localhost:5000/api/mantenimientos-ordenes', { params });
}

getEstadosFitosanitarios(): Observable<any[]> {
  return this.http.get<any[]>('http://localhost:5000/api/estados-fitosanitarios');
}








}












