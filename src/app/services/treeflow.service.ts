import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TreeflowService {
  private readonly apiUrl = 'http://localhost:5000/api'; // Definir la URL base de la API

  constructor(private readonly http: HttpClient) {}

  // Método para manejar errores
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Hubo un problema con la solicitud; inténtelo nuevamente más tarde.'));
  }

  // Métodos para obtener datos de tablas auxiliares
  getComunas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comunas`).pipe(
      catchError(this.handleError)
    );
  }

  getCalles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/calles`).pipe(
      catchError(this.handleError)
    );
  }

  getReferencias(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/referencias`).pipe(
      catchError(this.handleError)
    );
  }

  getEspecies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/especies`).pipe(
      catchError(this.handleError)
    );
  }

  getEstadosFitosanitarios(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estados-fitosanitarios`).pipe(
      catchError(this.handleError)
    );
  }

  getEstadosPlantera(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/estados-plantera`).pipe(
      catchError(this.handleError)
    );
  }

  getFasesVitales(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/fases-vitales`).pipe(
      catchError(this.handleError)
    );
  }

  getInclinaciones(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/inclinaciones`).pipe(
      catchError(this.handleError)
    );
  }

  getAhuecamientos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ahuecamientos`).pipe(
      catchError(this.handleError)
    );
  }

  getAnchosAceras(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/ancho_acera`).pipe(
      catchError(this.handleError)
    );
  }

  getDimensionesPlantera(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/dimensiones-plantera`).pipe(
      catchError(this.handleError)
    );
  }

  getTiposPlantacion(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tipos-plantacion`).pipe(
      catchError(this.handleError)
    );
  }

  getTareas(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tareas`).pipe(
      catchError(this.handleError)
    );
  }

 

  // Método POST para agregar un árbol con FormData
  addArbol(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/arboles`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Método POST para agregar una plantación
  addPlantacion(data: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/plantaciones`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Método POST para agregar mantenimiento
addMantenimiento(data: FormData): Observable<any> {
  return this.http.post(`${this.apiUrl}/mantenimientos`, data).pipe(
    catchError(this.handleError)
  );
}











  // Método GET para obtener tipos de tareas
  getTiposTarea(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/tareas`).pipe(
      catchError(this.handleError)
    );
  }

  // Método GET para obtener ítems
  getItems(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/items`).pipe(
      catchError(this.handleError)
    );
  }






// Método para filtrar árboles censados
filterArboles(filters: {
  comuna_id?: number;
  calle_id?: number;
  altura?: number;
  referencia_id?: number;
  especie_id?: number;
}): Observable<any> {
  // Convertir valores numéricos a cadenas y eliminar los valores undefined
  const params: { [param: string]: string } = {};

  if (filters['comuna_id'] !== undefined) params['comuna_id'] = filters['comuna_id'].toString();
  if (filters['calle_id'] !== undefined) params['calle_id'] = filters['calle_id'].toString();
  if (filters['altura'] !== undefined) params['altura'] = filters['altura'].toString();
  if (filters['referencia_id'] !== undefined) params['referencia_id'] = filters['referencia_id'].toString();
  if (filters['especie_id'] !== undefined) params['especie_id'] = filters['especie_id'].toString();

  return this.http.get<any>(`${this.apiUrl}/arboles-filtrados`, { params }).pipe(
    catchError(this.handleError)
  );
}

















  // Métodos auxiliares para obtener datos específicos
  getArboles(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/arboles`).pipe(
      catchError(this.handleError)
    );
  }

  getArbolById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/arboles/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Método PUT para actualizar un árbol existente
  updateArbol(id: number, arbolData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/arboles/${id}`, arbolData).pipe(
      catchError(this.handleError)
    );
  }

  // Método DELETE para eliminar un árbol por ID
  deleteArbol(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/arboles/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}







