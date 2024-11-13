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

	private urlUsers = environment.apiUrl + '/users';

	getFriends(userId: string): Observable<Usuario[]> {
		return this.http.get<any>(this.urlUsers + `/${userId}/friends`)
	}

	getFriendRequestsReceived(): Observable<Usuario[]> {
		return this.http.get<any>(this.urlUsers + `/friends/requests/received`)
	}

	getFriendRequestsSent(): Observable<Usuario[]> {
		return this.http.get<any>(this.urlUsers + `/friends/requests/sent`)
	}

	sendFriendRequest(friendId: string): Observable<any> {
		return this.http.post<any>(this.urlUsers + `/friends/`, null, { params: { Id: friendId } })
	}

	acceptFriendRequest(friendId: string): Observable<any> {
		return this.http.post<any>(this.urlUsers + `/friends/requests`, null, { params: { Id: friendId } })
	}

	rejectFriendRequest(friendId: string): Observable<any> {
		return this.http.delete<any>(this.urlUsers + `/friends/requests`, { params: { Id: friendId } })
	}
}
