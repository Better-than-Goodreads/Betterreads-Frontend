import { Component, Input, AfterViewInit } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { BibliotecaService } from '../../services/biblioteca.service';
import { AmigosService } from '../../services/amigos.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements AfterViewInit {
  @Input() usuario: Usuario = new Usuario({});
  @Input() showFollowButton: boolean = true;
  @Input() showMyself: boolean = false;
  
  constructor(private usuarioService: UsuariosService,
    private router: Router,
    public bibliotecaService: BibliotecaService,
    public amigosService: AmigosService) { }

  urlFotoPerfil = '';
  defaultImage = './default-profile.png';
  verUsuario() {
    this.router.navigate(['/user', this.usuario.id])
  }

  isMyself = false;
  ngAfterViewInit() {
    this.urlFotoPerfil = `http://localhost:8080/users/${this.usuario.id}/picture`;
    this.booksRead$ = this.bibliotecaService.getAmountOfReadBooks(this.usuario.id);
    this.friends$ = this.amigosService.getFriends(this.usuario.id).pipe(map(amigos => amigos.length));
    let user_id = sessionStorage.getItem('user_id');
    this.isMyself = user_id == this.usuario.id;
  }

  booksRead$: Observable<number> = of(0);
  friends$: Observable<number> = of(0);
}
