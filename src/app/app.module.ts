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
import { MatSelect } from "@angular/material/select";
import { MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle } from "@angular/material/card";

registerLocaleData(localeEsAr, "es-Ar");

@NgModule({
  declarations: [AppComponent, InicioSesionComponent, PrincipalComponent],
  imports: [
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    // Material
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    // Componentes
    MatSidenavModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatOption,
    MatSelect,
	MatCard,
	MatCardHeader,
	MatCardSubtitle,
	MatCardTitle,
	MatCardContent,
	MatCardActions,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-Ar" },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "outline" },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
