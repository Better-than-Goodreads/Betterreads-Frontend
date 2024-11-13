import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Usuario } from './entidades/usuario';

@Injectable({
	providedIn: 'root'
})
export class AmigosService {
	constructor(private http: HttpClient) { }

	private urlAmigos = environment.apiUrl + '/users/';

	getFriends(userId: string): Observable<Usuario[]> {
		return this.http.get<any>(this.urlAmigos + `/${userId}/friends`)
	}

	sendFriendRequest(friendId: string): Observable<any> {
		return this.http.post<any>(this.urlAmigos + `/friends`, {id: friendId})
	}

	acceptFriendRequest(friendId: string): Observable<any> {
		return this.http.post<any>(this.urlAmigos + `/friends/requests`, {id: friendId})
	}
}
