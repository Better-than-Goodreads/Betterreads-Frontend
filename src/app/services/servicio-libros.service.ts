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

	getToken() {
		return sessionStorage.getItem('token');
	}

	getBooks(): Observable<Libro[]> {
		const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
		return this.http.get<Libro[]>(this.apiUrl, { headers });
	}

	postBook(b: any): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken() });
		return this.http.post(this.apiUrl, JSON.stringify(b), { headers });
	}

	rateBook(bookId: string, rating: number): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.getToken() });
		return this.http.post(this.apiUrl + `/${bookId}/rating`, JSON.stringify({ rating: rating }), { headers });
	}

	getRating(bookId: string): Observable<any> {
		const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });
		return this.http.post(this.apiUrl + `/${bookId}/rating`, { headers });
	}
}
