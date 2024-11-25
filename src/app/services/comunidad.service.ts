import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comunidad } from '../entidades/Comunidad';

@Injectable({
  providedIn: 'root'
})
export class ComunidadService {

  private apiUrl = environment.apiUrl + '/communities/';
  constructor(private http: HttpClient) {}

  getCommunities(): Observable<Comunidad[]> {
    return this.http.get<Comunidad[]>(this.apiUrl);
  }

  getCommunityById(id: string): Observable<Comunidad> {
	  return this.http.get<Comunidad>(this.apiUrl + id);
  }

  joinCommunity(id: string): Observable<any> {
	return this.http.post(this.apiUrl + id + '/join', {});
  }

  leaveCommunity(id: string): Observable<Comunidad> {
	return this.http.delete<Comunidad>(this.apiUrl + id + '/leave');
  }

  createCommunity(form: FormData): Observable<Comunidad> {
	return this.http.post<Comunidad>(this.apiUrl, form);
  }
}
