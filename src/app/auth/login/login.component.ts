import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login({ email: this.email, password: this.password }).subscribe(
      (response) => {
        console.log('Login exitoso:', response);

        const role = response.role;

        // Redirigir según el rol
        if (role === 'Inspector') {
          this.router.navigate(['/inspectores/panel-inspectores']);
        } else if (role === 'Administrativo') {
          this.router.navigate(['/administrativo/monitoreo-tareas']);
        } else if (role === 'Empresa') {
          this.router.navigate(['/empresa/tareas']);
        } else {
          alert('Rol no reconocido.');
        }
      },
      (error) => {
        console.error('Error al iniciar sesión:', error);
        alert('Credenciales incorrectas.');
      }
    );
  }
}
