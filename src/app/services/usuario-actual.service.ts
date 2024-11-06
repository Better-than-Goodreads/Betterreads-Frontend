import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario, UsuarioRegister } from "../entidades/usuario";
import { Observable, of } from "rxjs";
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioActualService {
  usuarioActual = new Usuario({});
  constructor(private http: HttpClient) { }

  isAuthor(): Observable<boolean> {
    if (this.usuarioActual) return of(this.usuarioActual.is_author);

    const id = this.getId();
    const url = `${environment.apiUrl}/users/${id}`;
    return this.http.get<any>(url).pipe(map((res: {user: Usuario}) => res.user.is_author));
  }

  getId() {
    return sessionStorage.getItem('user_id');
  }

  getUsername(): Observable<string> {
    if (this.usuarioActual) return of(this.usuarioActual.username);

    const id = this.getId();
    const url = `${environment.apiUrl}/users/${id}`;
    return this.http.get<any>(url).pipe(map((res: {user: Usuario}) => res.user.username));
  }

  getUsuario(): Observable<Usuario> {
    if (this.usuarioActual.id) return of(this.usuarioActual);

    const id = this.getId();
    const url = `${environment.apiUrl}/users/${id}`;
    return this.http.get<any>(url).pipe(map((res: {user: Usuario}) => res.user));
  }

}
