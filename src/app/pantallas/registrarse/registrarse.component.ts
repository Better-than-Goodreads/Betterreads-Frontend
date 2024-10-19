import { Component } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-registrarse",
  templateUrl: "./registrarse.component.html",
  styleUrl: "./registrarse.component.css",
})
export class RegistrarseComponent {
  constructor() {}

  hide = true;

  ngOnInit(): void {
    this.infoPersonal.get("edad")?.valueChanges.subscribe((valor) => {
      this.infoPersonal
        .get("edad")
        ?.setValidators(valor ? [Validators.min(12)] : []);
    });
  }

  datosIniciales = new FormGroup({
    usuario: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  infoPersonal = new FormGroup({
    nombre: new FormControl("", [Validators.required]),
    apellido: new FormControl("", [Validators.required]),
    esAutor: new FormControl("", []),
  });

  infoOpcional = new FormGroup({
    genero: new FormControl("", []),
    edad: new FormControl("", []),
    pais: new FormControl("", []),
  });

  aboutMe = new FormGroup({ aboutMe: new FormControl("", []) });

  registrarse() {}
}
