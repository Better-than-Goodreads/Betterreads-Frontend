import { Component, ChangeDetectorRef, ViewChild } from "@angular/core";
import { Validators, FormGroup, FormControl, ValidationErrors, AbstractControl } from "@angular/forms";
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
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: "app-registrarse",
  templateUrl: "./registrarse.component.html",
  styleUrl: "./registrarse.component.css",
})
export class RegistrarseComponent {
  constructor(private usuarioService: UsuariosService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _cdr: ChangeDetectorRef) {}

  hide = true;
  errors = new Map<string, string>();


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

  selectedFile: File | null = null;
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      console.log('File selected:', file);
    }
  }

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
    this.usuarioService.createUsuario(usuario, this.selectedFile).pipe(catchError(error => {
      if (error.error.detail) {
        this._snackBar.open(error.error.detail, 'X', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        });
      }
      console.log(error);
      this.errors = new Map<string, string>(error.error.validation_errors.map((valError: {field: string, reason: string}) => [valError.field, valError.reason]));
      this.validateErrors();
      return of(null);
    })).subscribe(usuario => {
      if (usuario) this.router.navigate(['/home'])
    });
  }


  validateErrors() {
    if (this.errors.get('username')) this.datosIniciales.get('usuario')?.setErrors({'error': this.errors.get('username')});
    if(this.errors.get('email')) this.datosIniciales.get('email')?.setErrors({'error': this.errors.get('email')});
    if(this.errors.get('password')) this.datosIniciales.get('password')?.setErrors({'error': this.errors.get('password')});
    if(this.errors.get('first_name')) this.infoPersonal.get('nombre')?.setErrors({'error': this.errors.get('first_name')});
    if(this.errors.get('last_name')) this.infoPersonal.get('apellido')?.setErrors({'error': this.errors.get('last_name')});
    if(this.errors.get('is_author')) this.infoPersonal.get('esAutor')?.setErrors({'error': this.errors.get('is_author')});
    if(this.errors.get('gender')) this.infoOpcional.get('genero')?.setErrors({'error': this.errors.get('gender')});
    if(this.errors.get('agre')) this.infoOpcional.get('edad')?.setErrors({'error': this.errors.get('agre')});
    if(this.errors.get('location')) this.infoOpcional.get('pais')?.setErrors({'error': this.errors.get('location')});
    if(this.errors.get('about_me')) this.aboutMe.get('aboutMe')?.setErrors({'error': this.errors.get('about_me')});

    this._cdr.detectChanges();
    if (!this.stepper) return;
    if (!this.datosIniciales.valid) {
      this.stepper.selectedIndex=0;
    } else if (!this.infoPersonal.valid) {
      this.stepper.selectedIndex = 1;
    } else if (!this.infoOpcional.valid) {
      this.stepper.selectedIndex = 2;
    } else if (!this.aboutMe.valid) {
      this.stepper.selectedIndex = 3;
    }
  }

  @ViewChild('stepper') stepper: MatStepper | null = null;
}
