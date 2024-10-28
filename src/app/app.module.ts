import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { InicioSesionComponent } from "./pantallas/inicio-sesion/inicio-sesion.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { registerLocaleData } from "@angular/common";
import localeEsAr from "@angular/common/locales/es-AR";
import { RouterOutlet } from "@angular/router";
import {
	MAT_FORM_FIELD_DEFAULT_OPTIONS,
	MatFormFieldModule,
	MatLabel,
} from "@angular/material/form-field";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule, MatOption } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatDividerModule } from "@angular/material/divider";
import { MatStepperModule } from "@angular/material/stepper";
import { RegistrarseComponent } from "./pantallas/registrarse/registrarse.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { environment } from '../environments/environment';
import { UsuariosService } from './services/usuarios.service';
//import { MatSelect } from "@angular/material/select";
import { MatCardModule } from '@angular/material/card';
import { LibroComponent } from "./componentes/libro/libro.component";
import { PublicarLibroComponent } from "./pantallas/publicar-libro/publicar-libro.component";
import { MatDatepickerModule } from "@angular/material/datepicker";

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSpinner } from "@angular/material/progress-spinner";
import { JwtInterceptor } from "./interceptors/jwtInterceptor";
import { VistaLibroComponent } from './pantallas/vista-libro/vista-libro.component';

registerLocaleData(localeEsAr, "es-Ar");

@NgModule({
	declarations: [
		AppComponent,
		InicioSesionComponent,
		PrincipalComponent,
		RegistrarseComponent,
		LibroComponent,
		PublicarLibroComponent,
  VistaLibroComponent,
	],
	imports: [
		RouterOutlet,
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		// Material
		FormsModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatNativeDateModule,
		// Componentes
		MatSidenavModule,
		MatLabel,
		MatFormFieldModule,
		MatOption,
		//MatSelect,
		MatInputModule,
		MatButtonModule,
		MatToolbarModule,
		MatIconModule,
		MatSelectModule,
		MatDividerModule,
		MatStepperModule,
		MatCheckboxModule,
		MatCardModule,
		MatDatepickerModule,
		MatSpinner
	],
	providers: [
		{ provide: LOCALE_ID, useValue: "es-Ar" },
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: "outline" },
		},
		UsuariosService,
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: JwtInterceptor,
		  multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
