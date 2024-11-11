import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';

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
			status = 'Read';
		}
		return this.http.get<Libro[]>(this.apiUrl + `/${userId}` + '/shelf', { params: { type: status } });
	}

	removeFromBookshelf(bookId: string): Observable<any> {
		return this.http.delete(this.apiUrl + '/shelf/' + bookId);
	}
}
