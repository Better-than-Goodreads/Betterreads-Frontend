import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Libro } from '../entidades/Libro';

@Injectable({
	providedIn: 'root'
})
export class BibliotecaService {
	private apiUrl = environment.apiUrl + '/shelf/';

	constructor(private http: HttpClient) { }

	addToBookshelf(bookId: string, status: string): Observable<any> {
		return this.http.post(this.apiUrl, { book_id: bookId, status });
	}

	getBookshelf(status: string): Observable<Libro[]> {
		if (status == '') {
			status = 'Read';
		}
		return this.http.get<Libro[]>(this.apiUrl, { params: { status } });
	}
}
