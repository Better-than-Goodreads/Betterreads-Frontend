import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { UsuariosService } from "../../services/usuarios.service";
import { AmigosService } from '../../services/amigos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {
  usuarios: Usuario[] = [];
  loading = true;
  filtered = false;
  constructor(private usuarioService: UsuariosService, private amigosService: AmigosService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe({
          next: (usuarios) => {
          this.usuarios = usuarios;
          this.loading = false
        },
          error: (error:any) => {
            this.loading = false;
            this._snackBar.open('Error fetching users', 'X', {
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }});
  }

  searchText = '';
  onSearch() {
    this.filtered = true;
    this.loading = true;
    this.usuarioService.searchUsers(this.searchText, this.searchAuthor).subscribe({
      next: (usuarios: Usuario[]) => {
        this.loading = false;
        this.usuarios = usuarios;
      },
      error: (error: any) => {
        this.loading = false;
        console.error('Error fetching users', error);
        this._snackBar.open('Error fetching users', 'X', {
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
      }

    })
  }

  searchAuthor = false;
}
