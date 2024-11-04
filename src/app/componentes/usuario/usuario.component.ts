import { Component, Input, AfterViewInit } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements AfterViewInit {
  @Input() usuario: Usuario = new Usuario({});
  constructor(private usuarioService: UsuariosService, private router: Router) { }

  urlFotoPerfil = '';
  defaultImage = './default-profile.png';
  verLibro() {
    this.router.navigate(['/user', this.usuario.id])
  }

  ngAfterViewInit() {
    this.urlFotoPerfil = `http://localhost:8080/users/${this.usuario.id}/picture`;
  }
}
