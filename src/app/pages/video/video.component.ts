import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../interfaces/video';
import { BrowserModule, DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';


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
    private sanitizer: DomSanitizer
  ) {}


  public id!: string | null;
  public video!: Video | null;
  public video_url!: SafeResourceUrl;

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    if(this.id){

      this.videoService.getVid(parseInt(this.id)).subscribe((result) => {
        this.video = result
        if (this.video?.url) {
          const videoId = this.video.url.split('?v=')[1]?.split('&')[0];
          this.video.video_url = `https://www.youtube.com/embed/${videoId}`
          this.video_url =  this.sanitizer.bypassSecurityTrustResourceUrl(this.video.video_url)
          this.video.views = this.video.views + 1;
        }
        if (this.video?.views) {
          const updatedViews = this.video.views;
          this.videoService.updateVidViews(Number(this.video.id), { views: updatedViews }).subscribe();
        }
      })

     
    }

  }
}
