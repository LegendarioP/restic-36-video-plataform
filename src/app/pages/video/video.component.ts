import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../interfaces/video';


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
    private videoService: VideoService 
  ) {}


  public id!: string | null;
  public video!: Video | null;

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    if(this.id){

    
      this.videoService.getVid(parseInt(this.id)).subscribe((result) => (this.video = result))
    }


  }

}

// export class HomeComponent implements OnInit {
//   videos = Array<Video>()
//   constructor(private videoService: VideoService ){}

//   ngOnInit(): void {
//     this.videoService
//      .getVids()
//      .subscribe((result) => (this.videos = result))
//   }

// }
