import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from '../../environments/environment';
import { Usuario } from "../entidades/usuario";


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
    const url = `${this.urlUsuarios}/register-first`;
    const primerPaso = {
      "email": usuario.email,
      "first_name": usuario.first_name,
      "is_author": usuario.is_author,
      "last_name": usuario.last_name,
      "password": usuario.password,
      "username": usuario.username
    };
    return this.http.post<Usuario>(url, primerPaso)
  }
}
