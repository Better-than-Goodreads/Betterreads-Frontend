import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recomendacion } from '../entidades/Recomendacion';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  private apiUrl = environment.apiUrl + '/users/recommendations/';
  constructor(private http: HttpClient) {}

  getRecomendaciones(): Observable<Recomendacion[]> {
    return this.http.get<Recomendacion[]>(this.apiUrl);
  }
}
