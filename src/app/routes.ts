import { Routes } from "@angular/router";
import { BibliotecaComponent } from "./pantallas/biblioteca/biblioteca.component";
import { InicioSesionComponent } from "./pantallas/inicio-sesion/inicio-sesion.component";
import { LibrosPorAutorComponent } from "./pantallas/internas/libros-por-autor/libros-por-autor.component";
import { ReviewsPorUsuarioComponent } from "./pantallas/internas/reviews-por-usuario/reviews-por-usuario.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";
import { PublicarLibroComponent } from "./pantallas/publicar-libro/publicar-libro.component";
import { RecomendacionesComponent } from "./pantallas/recomendaciones/recomendaciones.component";
import { RegistrarseComponent } from "./pantallas/registrarse/registrarse.component";
import { RequestsComponent } from "./pantallas/requests/requests.component";
import { UsuariosComponent } from "./pantallas/usuarios/usuarios.component";
import { VistaLibroComponent } from "./pantallas/vista-libro/vista-libro.component";
import { VistaUsuariosComponent } from "./pantallas/vista-usuarios/vista-usuarios.component";

export const routes: Routes = [
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
    { path: "communities", component: ComunidadesComponent },
];

