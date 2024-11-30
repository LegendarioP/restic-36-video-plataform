import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Video } from '../../interfaces/video';
import { Favorite } from '../../interfaces/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private apiUrl = 'http://localhost:3000/favorites'

  constructor(private httpClient: HttpClient) { }


  getFavoritedVideo() {
    return this.httpClient.get<Favorite[]>(`${this.apiUrl}`)
  }

  addNewFavorite(newFav: Omit<Favorite, 'id'>) {
    return this.httpClient.post<Favorite>(`${this.apiUrl}`, {...newFav})
  }

  removeFavorite(id: string) {
    return this.httpClient.delete<Favorite>(`${this.apiUrl}/${id}`);
  }

  getAllFavUser(id: string) {
    return this.httpClient.get<Favorite[]>(`${this.apiUrl}?userId=${id}`)
  }
}


