import { Component } from '@angular/core';
import { Usuario } from '../../entidades/usuario';
import { ActivatedRoute } from '@angular/router';
import { UsuariosService } from "../../services/usuarios.service";

@Component({
  selector: 'app-vista-usuarios',
  templateUrl: './vista-usuarios.component.html',
  styleUrl: './vista-usuarios.component.css'
})
export class VistaUsuariosComponent {
  constructor(private route: ActivatedRoute, private usuarioService: UsuariosService){}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')?? '';
    this.usuarioService.getUsuario(id).subscribe(usuario => {
      this.usuario = usuario;
      console.log(usuario);
      this.urlFoto = `http://localhost:8080/users/${usuario.id}/picture`;
    });
  }

  urlFoto = '';
  usuario = new Usuario({});
}
