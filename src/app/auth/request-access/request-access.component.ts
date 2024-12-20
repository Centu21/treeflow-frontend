import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

interface PasswordResetResponse {
  message: string;
}

@Component({
  selector: 'app-request-access',
  templateUrl: './request-access.component.html',
  styleUrls: ['./request-access.component.css'],
})
export class RequestAccessComponent {
  email: string = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.requestPasswordReset(this.email).subscribe(
      (res: PasswordResetResponse) => {
        console.log('Solicitud de recuperación enviada:', res);
        alert('Se ha enviado un enlace de recuperación a tu correo.');
      },
      (err: any) => {
        console.error('Error en la solicitud de recuperación:', err);
        alert('Error al enviar la solicitud. Intenta nuevamente.');
      }
    );
  }
}
