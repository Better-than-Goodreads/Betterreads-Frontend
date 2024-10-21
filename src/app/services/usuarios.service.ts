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
  private url = environment.apiUrl + '/users'; 


  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url);
  }
  
  getUsuario(id: number): Observable<Usuario> {
    const url = `${this.url}/${id}`;
    return this.http.get<Usuario>(url);
  }

  createUsuario(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return of(usuario);
  }
}
