import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from '../../environments/environment';
import { Usuario, UsuarioRegister } from "../entidades/usuario";
import { catchError, switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  private urlUsuarios = environment.apiUrl + '/users'; 


  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.urlUsuarios);
  }
  
  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.urlUsuarios}/${id}`;
    return this.http.get<Usuario>(url);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    const urlPrimerPaso = `${this.urlUsuarios}/register/basic`;

    const primerPaso = {
      "email": usuario.email,
      "first_name": usuario.first_name,
      "is_author": usuario.is_author,
      "last_name": usuario.last_name,
      "password": usuario.password,
      "username": usuario.username
    };
    const segundoPaso = {
      "about_me": usuario.about_me,
      "age": usuario.age,
      "gender": usuario.gender,
      "location": usuario.location
    };

    return this.http.post<any>(urlPrimerPaso, primerPaso).pipe(switchMap( (usuarioParcial: {user: UsuarioRegister}) => {
      const usuarioRegister: UsuarioRegister = usuarioParcial.user; 
      console.log(usuarioRegister);
      console.log(usuarioRegister.id_register);
      const urlSegundoPaso = `${this.urlUsuarios}/register/${usuarioRegister.id_register}/additional-info`;
      return this.http.post<any>(urlSegundoPaso, segundoPaso);
    }),
    map((usuarioCreado: {user: Usuario}) => usuarioCreado.user),
    catchError(e => {
      console.log(e);
      return of(usuario);
    }
    ));
  }
}
