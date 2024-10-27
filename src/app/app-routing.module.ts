import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { InicioSesionComponent } from "./pantallas/inicio-sesion/inicio-sesion.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";
import { RegistrarseComponent } from "./pantallas/registrarse/registrarse.component";
import { PublicarLibroComponent } from "./pantallas/publicar-libro/publicar-libro.component";

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
  { path: "publicar-libro", component: PublicarLibroComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
