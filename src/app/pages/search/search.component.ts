import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../interfaces/video';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  host: {
    class: 'flex-component max col'
  }
})



export class SearchComponent implements OnInit {
  videos = Array<Video>()

  constructor(
    private router: ActivatedRoute,
    private videoService: VideoService,
  ){}
  public title?: string | null
  
  
  ngOnInit(): void {
      this.title = this.router.snapshot.queryParamMap.get('title');
      this.videoService.getVids().subscribe((result) => {
      this.videos = result.filter((video) => {
        return video.title.toLowerCase().includes(String(this.title?.toLowerCase()))
      })
    })
  }

}
