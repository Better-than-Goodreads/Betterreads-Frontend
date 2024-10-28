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
      }
    });
  }


  muestraSidenav(url: string) {
    return url === '/registrarse' || url === '/log-in' 
  }

  showSidenav = false;
}
