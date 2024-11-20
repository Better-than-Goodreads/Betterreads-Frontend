import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FeedPost } from '../entidades/FeedPost';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private apiUrl = environment.apiUrl + '/feed/';
  constructor(private http: HttpClient) {}

  getFeed(): Observable<FeedPost[]> {
    return this.http.get<FeedPost[]>(this.apiUrl);
  }
}
