import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { environment } from '../../environments/environment';
import { Usuario, UsuarioRegister } from "../entidades/usuario";
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { Review } from "../entidades/Review";
import { Libro } from "../entidades/Libro";

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }
  private urlUsuarios = environment.apiUrl + '/users'; 


  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<any>(this.urlUsuarios+'/').pipe(map((res: {users: Usuario[]}) => res.users as Usuario[]));
  }
  
  getUsuario(id: string): Observable<Usuario> {
    const url = `${this.urlUsuarios}/${id}`;
    return this.http.get<any>(url).pipe(map((res: {user: Usuario}) => res.user));
  }

  getReviewsUsuario(id: string): Observable<Review[]> {
    const url = environment.apiUrl + `/books/user/${id}/reviews`;
    return this.http.get<any>(url).pipe(map((res: {reviews: Review[]}) => res.reviews));
  }

  getBooksUsuario(id:string): Observable<Libro[]>{
    const url = environment.apiUrl + `/books/author/${id}`;
    return this.http.get<any>(url).pipe(map((res: {book: Libro, review:Review}[]) => res.map(data => data.book))); 
  }

  logIn(username: string, password: string): Observable<Usuario> {
    const url = this.urlUsuarios + '/login';
    return this.http.post<any>(url, {'password': password, 'username': username}).pipe(map((result: {user: Usuario, token:string}) => {
      sessionStorage.setItem('access_token', result.token);
      sessionStorage.setItem('username', result.user.username);
      sessionStorage.setItem('id', result.user.id);
      return result.user;
    }));
  }

  getUsuarioActual() {
    return sessionStorage.getItem('username');
  }

  createUsuario(usuario: Usuario, fotoUsuario: File | null): Observable<Usuario> {
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
      "location": usuario.location,
    };

    let usuarioADevolver;
    return this.http.post<any>(urlPrimerPaso, primerPaso).pipe(switchMap( (usuarioParcial: {user: UsuarioRegister}) => {
      const usuarioRegister: UsuarioRegister = usuarioParcial.user; 
      const urlSegundoPaso = `${this.urlUsuarios}/register/${usuarioRegister.id_register}/additional-info`;
      return this.http.post<any>(urlSegundoPaso, segundoPaso);
    }),
    tap((usuarioCreado: {user: Usuario}) => usuarioADevolver = usuarioCreado.user),
    switchMap(_ => this.logIn(usuario.username, usuario.password)),
    switchMap(_ => {
      if (!fotoUsuario) {
        return of(null);
      }
      const urlFoto = `${this.urlUsuarios}/picture`;
      let form = new FormData();
      form.append('file', fotoUsuario);
      return this.http.post(urlFoto, form);
    }),
    map(_ => usuario)
    );
  }
}
