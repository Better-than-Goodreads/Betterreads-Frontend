import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	private apiUrl = 'http://localhost:8080/books/';

	constructor(private http: HttpClient) { }

	getToken() {
		return sessionStorage.getItem('access_token');
	}

	getBooks(): Observable<Libro[]> {
		return this.http.get<Libro[]>(this.apiUrl + "info");
	}

	postBook(book: any, file: File): Observable<any> {
		// const headers = new HttpHeaders({ 'Authorization': 'Bearer ' + this.getToken() });

		let form = new FormData();
		form.append('data', JSON.stringify(book));
		form.append('file', file);

		return this.http.post(this.apiUrl, form);
	}

	rateBook(bookId: string, rating: number): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.post(this.apiUrl + `${bookId}/rating`, JSON.stringify({ rating: rating }), { headers });
	}

	getRating(bookId: string): Observable<any> {
		return this.http.get(this.apiUrl + `${bookId}/rating`);
	}
}
