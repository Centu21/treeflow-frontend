import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmpresaService {
  private baseUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  obtenerComunas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comunas`);
  }
  
  obtenerCalles(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/calles`);
  }
  
  obtenerOrdenesFiltradas(filtros: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/mantenimientos-ordenes`, { params: filtros });
  }
  
  obtenerEstados(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/estados`);
  }
  

  obtenerOrdenesAsignadas(): Observable<any[]> {
    const estados = ['Encomendado', 'Programado', 'Ejecución', 'Certificado'];
    return this.http.get<any[]>(`${this.baseUrl}/mantenimientos-ordenes?estado=${estados.join(',')}`);
  }


  obtenerTareas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tareas`);
  }
  
  obtenerItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items`);
  }
}
