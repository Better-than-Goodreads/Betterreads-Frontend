import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import {
  ACCION_LOG_IN,
  ACCION_SIGN_IN,
  InicioSesionComponent,
} from "./pantallas/inicio-sesion/inicio-sesion.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";

const routes: Routes = [
  { path: "", redirectTo: "/registrarse", pathMatch: "full" },
  {
    path: "registrarse",
    component: InicioSesionComponent,
    data: { accion: ACCION_SIGN_IN },
  },
  {
    path: "log-in",
    component: InicioSesionComponent,
    data: { accion: ACCION_LOG_IN },
  },

  { path: "home", component: PrincipalComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
