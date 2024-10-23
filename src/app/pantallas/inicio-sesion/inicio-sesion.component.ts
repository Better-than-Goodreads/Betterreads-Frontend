import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { UsuariosService } from "../../services/usuarios.service";
import { Usuario } from "../../entidades/usuario";
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';


@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
  styleUrl: "./inicio-sesion.component.css",
})
export class InicioSesionComponent {
  constructor(private usuarioService: UsuariosService, 
    private router: Router,
    private _snackBar: MatSnackBar) {}

  hide = true;

  datosIniciales = new FormGroup({
    usuario: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  submitLogin() {
    const usuario = this.datosIniciales.value.usuario ?? '';
    const password = this.datosIniciales.value.password ?? '';
    this.usuarioService.logIn(usuario, password).pipe(catchError(error => {
      this._snackBar.open(error.error.detail, 'X', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return of(null);
    })).subscribe( resultado => {
      if (resultado) {
        //setJWt
        console.log(resultado);
        this.router.navigate(['/home']);

      }
    })
  }
}
