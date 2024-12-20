import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { SessionService } from './session.service';

interface LoginResponse {
  message: string;
  token: string;
  role: string;
}

interface RegisterResponse {
  message: string;
}

interface User {
  firstName: string;
  lastName: string;
  cuit: string;
  email: string;
  password: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient, private sessionService: SessionService) {}

  /**
   * Iniciar sesión
   */
  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((res) => {
        if (res && res.token) {
          console.log('Token recibido:', res.token);
          this.sessionService.setUser({ token: res.token, role: res.role });
          console.log('Token almacenado en localStorage:', localStorage.getItem('token'));
        }
      })
    );
  }

  /**
   * Registrar un nuevo usuario
   */
  register(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, user);
  }

  /**
   * Solicitar restablecimiento de contraseña
   */
  requestPasswordReset(email: string): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.baseUrl}/request-reset`, { email });
  }

  /**
   * Cerrar sesión
   */
  logout() {
    this.sessionService.clearUser(); // Limpia los datos del usuario al cerrar sesión
  }
}
