import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioSesionComponent } from "./pantallas/inicio-sesion/inicio-sesion.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";
import { RegistrarseComponent } from "./pantallas/registrarse/registrarse.component";
import { PublicarLibroComponent } from "./pantallas/publicar-libro/publicar-libro.component";
import { VistaLibroComponent } from './pantallas/vista-libro/vista-libro.component';
import { VistaUsuariosComponent } from './pantallas/vista-usuarios/vista-usuarios.component';
import { UsuariosComponent } from './pantallas/usuarios/usuarios.component';
import { BibliotecaComponent } from "./pantallas/biblioteca/biblioteca.component";
import { RecomendacionesComponent } from "./pantallas/recomendaciones/recomendaciones.component";
import { LibrosPorAutorComponent } from "./pantallas/internas/libros-por-autor/libros-por-autor.component";
import { ReviewsPorUsuarioComponent } from "./pantallas/internas/reviews-por-usuario/reviews-por-usuario.component";
import { RequestsComponent } from "./pantallas/requests/requests.component";
import { ComunidadComponent } from "./componentes/comunidad/comunidad.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  {
    path: "register",
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
  { path: "bookshelf/:id", component: BibliotecaComponent },
  { path: "recommendations", component: RecomendacionesComponent },
  { path: "requests", component: RequestsComponent },
  { path: "user/:id/books-published", component: LibrosPorAutorComponent },
  { path: "user/:id/reviews-published", component: ReviewsPorUsuarioComponent },
  { path: "communities", component: ComunidadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
