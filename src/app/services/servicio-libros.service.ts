import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:8080/books';  

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Libro[]> {
    return this.http.get<Libro[]>(this.apiUrl);
  }

  postBook(libro: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post(this.apiUrl, JSON.stringify(libro), { headers });
  }
}
