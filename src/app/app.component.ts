import { Component } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioActualService } from './services/usuario-actual.service';
import { Usuario } from './entidades/usuario';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "betterReads";

  constructor(private router: Router, 
    private usuarioActualService: UsuarioActualService) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        // Check the URL to determine if the sidenav should be visible
        this.showSidenav = !this.muestraSidenav(currentUrl);
        this.usuarioActual = this.usuarioActualService.usuarioActual?.username ?? 'Log In';
        this.esAutor = this.usuarioActualService.usuarioActual?.is_author ?? false;
        this.id = this.usuarioActualService.usuarioActual?.id ?? '';
        this.urlFotoPerfil = this.id ? `http://localhost:8080/users/${this.id}/picture` : this.defaultImage;
      }
    });

  }
  esAutor = false;
  defaultImage = './default-profile.png';
  id = '';
  linkZonaUsuario() {
    if (this.id) {
      this.router.navigate(['/user', this.id]);
    } else {
      this.router.navigate(['/log-in']);
    }
  }

  usuarioActual = '';
  urlFotoPerfil = '';

  muestraSidenav(url: string) {
    return url === '/registrarse' || url === '/log-in' || url == '/'
  }

  showSidenav = false;
}
