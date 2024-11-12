import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { Observable, of } from "rxjs";
import { catchError } from 'rxjs/operators';
import { UsuariosService } from "../../services/usuarios.service";
import { Usuario } from "../../entidades/usuario";


@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
  styleUrl: "./inicio-sesion.component.css",
})
export class InicioSesionComponent {
  constructor(private usuarioService: UsuariosService, 
    private router: Router) {}

  hide = true;

  irARegister() {
    this.router.navigate(['/register']);
  }

  datosIniciales = new FormGroup({
    usuario: new FormControl("", [Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  error = '';
  submitLogin() {
    const usuario = this.datosIniciales.value.usuario ?? '';
    const password = this.datosIniciales.value.password ?? '';
    this.usuarioService.logIn(usuario, password).pipe(catchError(error => {
      this.error = error.error.detail;
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
