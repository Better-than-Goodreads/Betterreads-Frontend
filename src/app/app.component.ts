import { Component } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
import { UsuarioActualService } from './services/usuario-actual.service';
import { Usuario } from './entidades/usuario';
import { of } from "rxjs";


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
        this.usuarioActualService.getUsuario().subscribe(user => {
          this.usuarioActual = user?.username ? user.username : 'Log In';
          this.esAutor = user.is_author ?? false;
          this.id = user.id ?? '';
          this.urlFotoPerfil = this.id ? `http://localhost:8080/users/${this.id}/picture` : this.defaultImage;
        })
        this.showSidenav = !this.muestraSidenav(currentUrl);
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
    return url === '/register' || url === '/log-in'
  }

  showSidenav = false;
}
