import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Favorite } from '../../interfaces/favorite';
import { Video } from '../../interfaces/video';
import { FavoriteService } from '../../services/favorites/favorite.service';
import { VideoService } from '../../services/video/video.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  host: {
    class: "flex-component col max"
  }
})
export class FavoritesComponent implements OnInit {

  constructor (
    private favoriteService: FavoriteService,
    private videoService: VideoService,
    public auth: AuthService
  ) {}


  public id!: string | null;
  public userId!: string | number | null
  public isFavorited?: boolean
  public favorites = Array<Favorite>()
  public favoritedVideosToFetch = Array<Video>()

  

  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.userId = String(profile?.sub).split("|")[1]
      this.favoriteService.getAllFavUser(String(this.userId)).subscribe((result) => {
        this.favorites = result
        const videoRequests = this.favorites.map((item) =>
          this.videoService.getVid(item.videoId)
        );
        forkJoin(videoRequests).subscribe((videos) => {
          this.favoritedVideosToFetch = videos; 
        });
      })
    })
  }

}
