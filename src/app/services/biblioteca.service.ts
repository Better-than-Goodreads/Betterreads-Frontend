import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class BibliotecaService {
	private apiUrl = environment.apiUrl + '/users';

	constructor(private http: HttpClient) { }

	addToBookshelf(bookId: string, status: string): Observable<any> {
		return this.http.post(this.apiUrl + '/shelf/', { book_id: bookId, status: status });
	}

	editToBookshelf(bookId: string, status: string): Observable<any> {
		return this.http.put(this.apiUrl + '/shelf/', { book_id: bookId, status: status });
	}

	getBookshelf(userId: string, status: string): Observable<Libro[]> {
		if (status == '') {
			status = 'read';
		}
		return this.http.get<Libro[]>(this.apiUrl + `/${userId}` + '/shelf', { params: { status: status } });
	}

	removeFromBookshelf(bookId: string): Observable<any> {
		return this.http.delete(this.apiUrl + '/shelf/', {params: {id: bookId}});
	}

	getAmountOfReadBooks(userId: string) {
		return this.getBookshelf(userId, 'read').pipe(map(books => books.length));
	}

	search(id: string, status: string, genre: string, sort: string, order: string) {
		const params = [];
		if (status) params.push("status="+status);
		if (genre) params.push("genre="+genre);
		if (sort) params.push("sort="+sort);
		if (sort && order) params.push("direction="+order);
		const url = `${this.apiUrl}/${id}/shelf/search?${params.join('&')}`;
		return this.http.get(url);
	}
}
