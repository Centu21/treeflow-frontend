import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../services/session.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userName: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit() {
    console.log('Token al iniciar HeaderComponent:', this.sessionService.getToken());
    this.sessionService.getUserInfo().subscribe(
      (res) => {
        console.log('Respuesta del servidor:', res);
        this.userName = res.name;
      },
      (err) => {
        console.error('Error al obtener el usuario:', err);
        this.userName = '';
      }
    );
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
