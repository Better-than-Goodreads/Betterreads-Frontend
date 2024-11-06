import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendacion } from '../entidades/Recomendacion';
import { Libro } from '../entidades/Libro';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  private apiUrl = environment.apiUrl + '/users/recommendations/';
  constructor(private http: HttpClient) {}

  getRecomendaciones(): Observable<Recomendacion[]> {
    return this.http.get<Recomendacion[]>(this.apiUrl);
  }

  getMore(genre: string): Observable<Libro[]> {
    const url = this.apiUrl + 'more?genre=' + genre;
    return this.http.get<Libro[]>(url);
  }
}
