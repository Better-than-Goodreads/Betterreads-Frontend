import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioSesionComponent } from "./pantallas/inicio-sesion/inicio-sesion.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";
import { RegistrarseComponent } from "./pantallas/registrarse/registrarse.component";
import { PublicarLibroComponent } from "./pantallas/publicar-libro/publicar-libro.component";
import { VistaLibroComponent } from './pantallas/vista-libro/vista-libro.component';
import { VistaUsuariosComponent } from './pantallas/vista-usuarios/vista-usuarios.component';
import { UsuariosComponent } from './pantallas/usuarios/usuarios.component';

const routes: Routes = [
  { path: "", redirectTo: "/registrarse", pathMatch: "full" },
  {
    path: "registrarse",
    component: RegistrarseComponent,
  },
  {
    path: "log-in",
    component: InicioSesionComponent,
  },
  { path: "home", component: PrincipalComponent },
  { path: "post-book", component: PublicarLibroComponent },
  { path: "book/:id", component: VistaLibroComponent },
  { path: "user/:id", component: VistaUsuariosComponent },
  { path: "users", component: UsuariosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
