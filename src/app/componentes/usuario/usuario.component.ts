import { Component, Input, AfterViewInit } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BibliotecaService } from '../../services/biblioteca.service';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements AfterViewInit {
  @Input() usuario: Usuario = new Usuario({});
  @Input() showFollowButton: boolean = true;

  constructor(private usuarioService: UsuariosService, private router: Router, public bibliotecaService: BibliotecaService) { }

  urlFotoPerfil = '';
  defaultImage = './default-profile.png';
  verLibro() {
    this.router.navigate(['/user', this.usuario.id])
  }

  ngAfterViewInit() {
    this.urlFotoPerfil = `http://localhost:8080/users/${this.usuario.id}/picture`;
    this.booksRead$ = this.bibliotecaService.getAmountOfReadBooks(this.usuario.id);
  }

  booksRead$: Observable<number> = of(0);
}
