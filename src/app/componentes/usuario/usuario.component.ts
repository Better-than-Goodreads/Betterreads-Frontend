import { Component, Input } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  @Input() usuario: Usuario = new Usuario({});
  constructor(private usuarioService: UsuariosService, private router: Router) { }

  urlFotoPerfil = `http://localhost:8080/users/${this.usuario.id}/picture`;
  defaultImage = './default-profile.png';
  verLibro() {
    this.router.navigate(['/user', this.usuario.id])
  }
}
