import { Component } from '@angular/core';
import { Usuario } from '../../../entidades/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from "../../../services/usuarios.service";
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-reviews-por-usuario',
  templateUrl: './reviews-por-usuario.component.html',
  styleUrl: './reviews-por-usuario.component.css'
})
export class ReviewsPorUsuarioComponent {

  constructor(private route: ActivatedRoute, private usuarioService: UsuariosService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.usuarioService.getUsuario(id).pipe(switchMap(usuario => {
      this.usuario = usuario;
      return this.usuarioService.getReviewsUsuario(this.usuario.id);
    }))
    .subscribe(reviews => {
      this.reviews = reviews.map(review => {
        review.user_id = id;
        review.username = this.usuario.username;
        return review;
      });
      this.loading = false;
    })
  }

  loading = true;

  usuario: Usuario = new Usuario({});
  reviews: any[] = [];
}
