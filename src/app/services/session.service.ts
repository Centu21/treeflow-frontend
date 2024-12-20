import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  // Obtener información del usuario desde el backend usando el token
  getUserInfo(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      console.warn('No hay token disponible.');
      return new Observable((observer) => {
        observer.error('No hay token disponible.');
        observer.complete();
      });
    }

    return this.http.get(`${this.baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // Guardar el token y los datos del usuario en localStorage
  setUser(user: { token: string; role: string }) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('role', user.role);
    console.log('setUser - Token guardado:', user.token);
  }

  // Obtener el token almacenado en localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Obtener el rol del usuario almacenado en localStorage
  getRole(): string | null {
    return localStorage.getItem('role');
  }

  // Limpiar la sesión del usuario (token y datos)
  clearUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
