import { Component } from "@angular/core";
import { Router, NavigationEnd } from '@angular/router';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  title = "betterReads";

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.url;
        // Check the URL to determine if the sidenav should be visible
        this.showSidenav = !this.muestraSidenav(currentUrl);
        this.usuarioActual = sessionStorage.getItem('username')?? 'Log In';
        this.id = sessionStorage.getItem('id')?? '';
        this.urlFotoPerfil = this.id ? `http://localhost:8080/users/${this.id}/picture` : './default-profile.png';
      }
    });

  }

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
