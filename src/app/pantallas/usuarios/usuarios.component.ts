import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from "../../services/usuarios.service";
import { AmigosService } from '../../services/amigos.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  loading = true;
  constructor(private usuarioService: UsuariosService, private amigosService: AmigosService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.usuarios = usuarios;
      this.loading = false});
  }

  searchText = '';
  onSearch() {
    this.loading = true;
    this.usuarioService.searchUsers(this.searchText, this.searchAuthor).subscribe({
      next: (usuarios: Usuario[]) => {
        this.loading = false;
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        console.error('Error fetching users', error);
      }

    })
  }

  searchAuthor = false;
}
