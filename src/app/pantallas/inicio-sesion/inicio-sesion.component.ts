import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
  styleUrl: "./inicio-sesion.component.css",
})
export class InicioSesionComponent {
  constructor() {}

  hide = true;

  datosIniciales = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submitLogin() {}
}
