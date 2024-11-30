import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../interfaces/video';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { FavoriteService } from '../../services/favorites/favorite.service';
import { Favorite } from '../../interfaces/favorite';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css',
  host: {
    class: 'flex-video'
  }
})
export class VideoComponent implements OnInit {

  constructor (
    private router: ActivatedRoute, 
    private videoService: VideoService,
    private favoriteService: FavoriteService,
    private sanitizer: DomSanitizer,
    public auth: AuthService
  ) {}


  public id!: string | null;
  public video!: Video | null;
  public video_url!: SafeResourceUrl;
  public favorite?: Favorite | null;
  public userId!: string | number | null

  public isFavorited?: boolean
  

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    if(this.id){
      this.videoService.getVid(parseInt(this.id)).subscribe((result) => {
        this.video = result
        if (this.video?.url) {
          const videoId = this.video.url.split('?v=')[1]?.split('&')[0];
          this.video.video_url = `https://www.youtube.com/embed/${videoId}?autoplay=1`
          this.video_url =  this.sanitizer.bypassSecurityTrustResourceUrl(this.video.video_url)
          this.video.views = this.video.views + 1;
        }
        if (this.video?.views) {
          const updatedViews = this.video.views;
          this.videoService.updateVidViews(Number(this.video.id), { views: updatedViews }).subscribe();
        }
      })

      this.auth.user$.subscribe((profile) => {
        this.userId = String(profile?.sub).split("|")[1]
        this.favoriteService.getAllFavUser(this.userId).subscribe((result) => {
          result.find((favorite) => { return  this.isFavorited = String(favorite.videoId) == String(this.id)})
          if(this.isFavorited){
            this.favorite = result.find((favorite) =>  String(favorite.videoId) === String(this.id) && String(favorite.userId) === String(profile?.sub).split("|")[1]
          )
        }
        })
      })
      
    }

  }


  
  toggleFavorite() {
    if(this.userId){
      if(!this.isFavorited){
        this.favoriteService.addNewFavorite({ userId: String(this.userId), videoId: Number(this.id) }).subscribe({
          next: (data) => {
            this.favorite = data
            this.isFavorited = true
          }
        })
      }
      else {
        this.favoriteService.removeFavorite(String(this.favorite?.id)).subscribe({
          next: () => {
            this.isFavorited = false
          }
        })
      }
    }
  }
}
