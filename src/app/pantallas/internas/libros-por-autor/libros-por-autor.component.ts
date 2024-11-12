import { Component } from '@angular/core';
import { Usuario } from '../../../entidades/usuario';
import { Libro } from "../../../entidades/Libro";
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from "../../../services/usuarios.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-libros-por-autor',
  templateUrl: './libros-por-autor.component.html',
  styleUrl: './libros-por-autor.component.css'
})
export class LibrosPorAutorComponent {

  constructor(private route: ActivatedRoute, private usuarioService: UsuariosService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.usuarioService.getUsuario(id).pipe(switchMap(usuario => {
      this.usuario = usuario;
      return this.usuarioService.getBooksUsuario(this.usuario.id);
    }))
    .subscribe(books => {
      this.books = books;
      this.loading = false;
    })
  }

  loading = true;

  usuario: Usuario = new Usuario({});
  books: Libro[] = [];
}
