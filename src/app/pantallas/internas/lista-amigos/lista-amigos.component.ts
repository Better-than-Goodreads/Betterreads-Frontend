import { Component } from '@angular/core';
import { AmigosService } from '../../../services/amigos.service';
import { UsuariosService } from "../../../services/usuarios.service";
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../../entidades/usuario';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-lista-amigos',
  templateUrl: './lista-amigos.component.html',
  styleUrl: './lista-amigos.component.css'
})
export class ListaAmigosComponent {

    constructor(private route: ActivatedRoute, private usuarioService: UsuariosService, private amigosService: AmigosService) {}

    usuario = new Usuario({});
    friends: Usuario[] = [];
    loading = true;

    ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.usuarioService.getUsuario(id).pipe(switchMap(usuario => {
      this.usuario = usuario;
      return this.amigosService.getFriends(this.usuario.id);
    }))
    .subscribe(friends => {
      this.friends = friends;
      this.loading = false;
    })
  }
}
