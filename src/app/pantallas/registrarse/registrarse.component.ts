import { Component } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { UsuariosService } from "../../services/usuarios.service";
import { Usuario } from "../../entidades/usuario";
import { catchError } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { Router } from '@angular/router';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: "app-registrarse",
  templateUrl: "./registrarse.component.html",
  styleUrl: "./registrarse.component.css",
})
export class RegistrarseComponent {
  constructor(private usuarioService: UsuariosService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}

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
    esAutor: new FormControl(false, []),
  });

  infoOpcional = new FormGroup({
    genero: new FormControl("", []),
    edad: new FormControl(18, []),
    pais: new FormControl("", []),
  });

  aboutMe = new FormGroup({ aboutMe: new FormControl("", []) });

  registrarse() {
    const usuario = new Usuario({
      username: this.datosIniciales.value.usuario?? '',
      email: this.datosIniciales.value.email?? '',
      password: this.datosIniciales.value.password?? '',
      first_name: this.infoPersonal.value.nombre?? '',
      last_name: this.infoPersonal.value.apellido?? '',
      is_author: this.infoPersonal.value.esAutor?? false,

      gender: this.infoOpcional.value.genero?? '',

      age: this.infoOpcional.value.edad ? this.infoOpcional.value.edad : -1,
      location: this.infoOpcional.value.pais?? '',
      about_me: this.aboutMe.value.aboutMe?? ''
    });
    // TODO: ver el tema de guardar el usuario/ sesion
    this.usuarioService.createUsuario(usuario).pipe(catchError(error => {
      this._snackBar.open(error.error.detail, 'X', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return of(null);
    })).subscribe(usuario => {
      if (usuario) this.router.navigate(['/home'])
    });
  }
}
