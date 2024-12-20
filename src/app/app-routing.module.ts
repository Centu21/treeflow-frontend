import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'administrador', loadChildren: () => import('./administrador/administrador.module').then(m => m.AdministradorModule) },
  { path: 'administrativo', loadChildren: () => import('./administrativo/administrativo.module').then(m => m.AdministrativoModule) },
  { path: 'empresa', loadChildren: () => import('./empresa/empresa.module').then(m => m.EmpresaModule) },
  { path: 'inspectores', loadChildren: () => import('./inspectores/inspectores.module').then(m => m.InspectoresModule) },
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }