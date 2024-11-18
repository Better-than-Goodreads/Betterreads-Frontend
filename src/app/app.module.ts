import { BrowserModule } from "@angular/platform-browser";
import { LOCALE_ID, NgModule } from "@angular/core";
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

import { AppComponent } from "./app.component";
import { InicioSesionComponent } from "./pantallas/inicio-sesion/inicio-sesion.component";
import { PrincipalComponent } from "./pantallas/principal/principal.component";
import { MatSidenavModule } from "@angular/material/sidenav";
import { registerLocaleData } from "@angular/common";
//import localeEn from '@angular/common/locales/en-US';
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
import { UsuarioActualService } from './services/usuario-actual.service';
import { MatCardModule } from '@angular/material/card';
import { LibroComponent } from "./componentes/libro/libro.component";
import { PublicarLibroComponent } from "./pantallas/publicar-libro/publicar-libro.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MatSpinner } from "@angular/material/progress-spinner";
import { JwtInterceptor } from "./interceptors/jwtInterceptor";
import { VistaLibroComponent } from './pantallas/vista-libro/vista-libro.component';
import { VistaUsuariosComponent } from './pantallas/vista-usuarios/vista-usuarios.component';
import { UsuariosComponent } from './pantallas/usuarios/usuarios.component';
import { UsuarioComponent } from './componentes/usuario/usuario.component';
import { ReviewComponent } from "./componentes/review/review.component";
import { BibliotecaComponent } from "./pantallas/biblioteca/biblioteca.component";
import { RecomendacionesComponent } from './pantallas/recomendaciones/recomendaciones.component';
import { LibrosPorAutorComponent } from './pantallas/internas/libros-por-autor/libros-por-autor.component';
import { ReviewsPorUsuarioComponent } from './pantallas/internas/reviews-por-usuario/reviews-por-usuario.component';
import { RequestsComponent } from './pantallas/requests/requests.component';
import { BookshelfComponent } from './componentes/bookshelf/bookshelf.component';
import { ComunidadComponent } from "./componentes/comunidad/comunidad.component";

//registerLocaleData(localeEn, 'en-US');

@NgModule({
	declarations: [
		AppComponent,
		InicioSesionComponent,
		PrincipalComponent,
		RegistrarseComponent,
		LibroComponent,
		PublicarLibroComponent,
		VistaLibroComponent,
		VistaUsuariosComponent,
		UsuariosComponent,
		UsuarioComponent,
		ReviewComponent,
		BibliotecaComponent,
		RecomendacionesComponent,
		LibrosPorAutorComponent,
		ReviewsPorUsuarioComponent,
		RequestsComponent,
    BookshelfComponent,
    ComunidadComponent
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
		MatListModule,
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
		MatSpinner,
		MatButtonToggleModule,
		MatSlideToggleModule
	],
	providers: [
		//{ provide: LOCALE_ID, useValue: "en-US" },
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: "outline" },
		},
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
		UsuariosService,
		UsuarioActualService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
