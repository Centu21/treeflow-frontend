import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe } from '@angular/common';

import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module'; // Importar el módulo compartido si se usa en la app
import { AuthInterceptor } from './services/auth.interceptor'; // Importar el interceptor

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule,
    SharedModule, // Importar el SharedModule si es necesario
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS, // Registrar el interceptor
      useClass: AuthInterceptor,
      multi: true, // Permite que haya múltiples interceptores
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
