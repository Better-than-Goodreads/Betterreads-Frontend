import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { ActivatedRoute } from "@angular/router";

export const ACCION_SIGN_IN = "signIn";
export const ACCION_LOG_IN = "logIn";

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

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
    });
  }

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);

  matcher = new MyErrorStateMatcher();

  usuario = "";
  email = "";
  password = "";
}
