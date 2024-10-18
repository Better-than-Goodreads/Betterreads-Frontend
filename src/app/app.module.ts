import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { InicioSesionComponent } from './pantallas/inicio-sesion/inicio-sesion.component';
import { PrincipalComponent } from './pantallas/principal/principal.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { RouterOutlet } from '@angular/router';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbar, MatToolbarModule } from '@angular/material/toolbar';
import { MatIcon, MatIconModule } from '@angular/material/icon';

registerLocaleData(localeEsAr, 'es-Ar');

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    PrincipalComponent
  ],
  imports: [
    RouterOutlet,
    BrowserModule,
    AppRoutingModule,
    // Material
    FormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    // Componentes
    MatSidenavModule,
    MatLabel,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: "es-Ar" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }