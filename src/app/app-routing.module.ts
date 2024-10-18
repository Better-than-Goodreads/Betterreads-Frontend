import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './pantallas/inicio-sesion/inicio-sesion.component';
import { PrincipalComponent } from './pantallas/principal/principal.component';

const routes: Routes = [
  { path: '', redirectTo: '/registrarse', pathMatch: 'full' },
  { path: 'registrarse', component: InicioSesionComponent },
  { path: 'home', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }