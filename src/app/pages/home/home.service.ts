import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../../interfaces/video';

@Injectable({
  providedIn: 'root'
})


export class HomeService {
  private apiUrl = 'http://localhost:3000/videos'

  constructor(private httpClient: HttpClient) { }

  getVids(): Observable<Video[]>{
    return this.httpClient.get<Video[]>(this.apiUrl)
  }
}
