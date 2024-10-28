import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';
import { environment } from '../../environments/environment';
import { catchError, switchMap, map, tap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	private apiUrl = environment.apiUrl + '/books/';

	constructor(private http: HttpClient) { }

	getBook(id: string): Observable<Libro> {
		const url = `${this.apiUrl}${id}/info`;
		return this.http.get<any>(url).pipe(map((libro: {book: Libro}) => libro.book));
	}

	getBooks(): Observable<Libro[]> {
		return this.http.get<Libro[]>(this.apiUrl + "info");
	}

	postBook(book: any, file: File): Observable<any> {
		let form = new FormData();
		form.append('data', JSON.stringify(book));
		form.append('file', file);

		return this.http.post<Libro>(this.apiUrl, form);
	}

	rateBook(bookId: string, rating: number): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.post(this.apiUrl + `${bookId}/rating`, JSON.stringify({ rating: rating }), { headers });
	}

	getRating(bookId: string): Observable<any> {
		return this.http.get(this.apiUrl + `${bookId}/rating`);
	}

	searchBooks(searchText: string): Observable<Libro[]> {
		return this.http.get<Libro[]>(this.apiUrl + `info/search?name=${searchText}`);
	}
}
