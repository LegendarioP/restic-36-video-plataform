import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../interfaces/video';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-video',
  standalone: true,
  imports: [],
  templateUrl: './video.component.html',
  styleUrl: './video.component.css'
})
export class VideoComponent implements OnInit {

  constructor (
    private router: ActivatedRoute, 
    private videoService: VideoService,
    private sanitizer: DomSanitizer // Injeção do DomSanitizer
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
          this.video.video_url = `https://www.youtube.com/embed/${videoId}?autoplay=1`
          this.video_url =  this.sanitizer.bypassSecurityTrustResourceUrl(this.video.video_url)
        }
      })
    }
  }
}
