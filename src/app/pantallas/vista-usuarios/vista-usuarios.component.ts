import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { Review } from '../../entidades/Review';
import { Libro } from "../../entidades/Libro";
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";
import { switchMap } from 'rxjs/operators';
import { forkJoin} from 'rxjs';

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.css'
})
export class VistaUsuariosComponent {
  constructor(private route: ActivatedRoute, private usuarioService: UsuariosService){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.usuarioService.getUsuario(id).pipe(switchMap(usuario => {
      this.usuario = usuario;
      this.urlFoto = `http://localhost:8080/users/${usuario.id}/picture`;
      return forkJoin([this.usuarioService.getReviewsUsuario(this.usuario.id), this.usuarioService.getBooksUsuario(this.usuario.id)]);
    }))
    .subscribe(([reviews, books]) => {
      this.reviews = reviews.map(review => {
        review.user_id = id;
        review.username = this.usuario.username;
        return review;
      });
      this.books = books;

    })
  }

  books: Libro[] = [];
  reviews: Review[] = [];

  defaultImage = './default-profile.png';
  urlFoto = '';
  usuario = new Usuario({});
}
