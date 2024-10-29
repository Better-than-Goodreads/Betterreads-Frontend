import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from "../../services/usuarios.service";

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  loading = true;
  constructor(private usuarioService: UsuariosService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.loading = false});
  }
}
