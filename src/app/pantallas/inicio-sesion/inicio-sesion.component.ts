import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute } from "@angular/router";

export const ACCION_SIGN_IN = "signIn";
export const ACCION_LOG_IN = "logIn";

@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
  styleUrl: "./inicio-sesion.component.css",
})
export class InicioSesionComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  hide = true;

  esSignIn = false;
  ngOnInit(): void {
    this.route.data.subscribe((params) => {
      this.esSignIn = params["accion"] === ACCION_SIGN_IN;

      this.datosIniciales
        .get("usuario")
        ?.setValidators(this.esSignIn ? [Validators.required] : []);
    });
  }

  datosIniciales = new FormGroup({
    usuario: new FormControl("", []),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  paso1 = true;
  paso2 = false;
  paso3 = false;
  submitDatosIniciales() {
    console.log("hola!");
    if (!this.esSignIn) {
      // TODO: login
      return;
    }
    console.log("Estoy cambiando");
    this.paso1 = false;
    this.paso2 = true;
  }

  infoPersonal = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    genero: new FormControl("", []),
    edad: new FormControl("", [Validators.min(12)]),
    pais: new FormControl("", []),
  });

  submitInfoPersonal() {
    this.paso2 = false;
    this.paso3 = true;
  }
}
