import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';
import { environment } from '../../environments/environment';
import { catchError, switchMap, map, tap } from 'rxjs/operators';
import { Review } from '../entidades/Review';

@Injectable({
	providedIn: 'root'
})
export class BookService {
	private apiUrl = environment.apiUrl + '/books/';

	constructor(private http: HttpClient) { }

	getBook(id: string): Observable<any> {
		const url = `${this.apiUrl}${id}/info`;
		return this.http.get<any>(url)
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

	searchBooks(searchText: string): Observable<Libro[]> {
		return this.http.get<Libro[]>(this.apiUrl + `info/search?name=${searchText}`);
	}

	rateBook(bookId: string, rating: number): Observable<any> {
		const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
		return this.http.post(this.apiUrl + `${bookId}/rating`, JSON.stringify({ rating: rating }), { headers });
	}

	getRating(bookId: string): Observable<any> {
		return this.http.get(this.apiUrl + `${bookId}/rating`);
	}

	getReviews(bookId: string): Observable<{reviews: Review[]}> {
		return this.http.get<{reviews: Review[]}>(this.apiUrl + `${bookId}/reviews`);
	}

	postReview(bookId: string, review: Review): Observable<String> {
		return this.http.post<String>(this.apiUrl + `${bookId}/reviews`, review);
	}

	deleteBook(bookId: string): Observable<String> {
		return this.http.delete<String>(this.apiUrl + `${bookId}`);
	}
}
