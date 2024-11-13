import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { Libro } from "../../entidades/Libro";
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";
import { switchMap } from 'rxjs/operators';
import { forkJoin, of, Observable } from 'rxjs';
import { AmigosService } from '../../amigos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.css'
})
export class VistaUsuariosComponent {
  constructor(private route: ActivatedRoute, private usuarioService: UsuariosService, private amigosService: AmigosService, private _snackBar: MatSnackBar){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.usuarioService.getUsuario(id).pipe(switchMap(usuario => {
      this.usuario = usuario;
      this.urlFoto = `http://localhost:8080/users/${usuario.id}/picture`;
      return forkJoin([this.usuarioService.getReviewsUsuario(this.usuario.id), this.getBooks(), this.amigosService.getFriends(this.usuario.id)]);
    }))
    .subscribe(([reviews, books, friends]) => {
      this.reviews = reviews.map(review => {
        review.user_id = id;
        review.username = this.usuario.username;
        return review;
      });
      this.books = books;
	  this.friends = friends;
    })
  }

  getBooks(): Observable<Libro[]> {
    return (this.usuario.is_author) ? this.usuarioService.getBooksUsuario(this.usuario.id) : of([]);
  }

  sendFriendRequest() {
	  this.amigosService.sendFriendRequest(this.usuario.id).subscribe(({
		  next: () => { this._snackBar.open('Friend request sent', 'Close', {
				duration: 2000,
		  })},
		  error: (error) => {
			  console.log('Error sending friend request', error.status);
			  if (error.status == 409) {
				  this._snackBar.open('Friend request already sent', 'Close', {
					  duration: 2000,
				  })
			  } else {
				  this._snackBar.open('Error sending friend request', 'Close', {
					  duration: 2000,
				  })
			  }
		  }
	  }));
  }

  books: Libro[] = [];
  reviews: any[] = [];
  friends: Usuario[] = [];

  defaultImage = './default-profile.png';
  urlFoto = '';
  usuario = new Usuario({});
}
