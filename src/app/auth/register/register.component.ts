import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

interface User {
  firstName: string;
  lastName: string;
  cuit: string;
  email: string;
  password: string;
  role: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  firstName: string = '';
  lastName: string = '';
  cuit: string = '';
  email: string = '';
  password: string = '';
  role: string = 'Inspector'; // Rol por defecto
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const user: User = {
      firstName: this.firstName,
      lastName: this.lastName,
      cuit: this.cuit,
      email: this.email,
      password: this.password,
      role: this.role,
    };

    this.authService.register(user).subscribe(
      (res) => {
        console.log('Registro exitoso:', res);
        alert('Registro exitoso. Espera la aprobación del administrador.');
        this.router.navigate(['/auth/login']); // Redirigir a la página de login
      },
      (err) => {
        console.error('Error en el registro:', err);
        alert('Error en el registro. Intenta nuevamente.');
      }
    );
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
