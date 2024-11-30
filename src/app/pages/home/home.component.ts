import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { VideoService } from '../../services/video/video.service';
import { Video } from '../../interfaces/video';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  host: {
    class: 'flex-component'
  }
})
export class HomeComponent implements OnInit {
  videos = Array<Video>()
  constructor(private videoService: VideoService ){}

  ngOnInit(): void {
    this.videoService
     .getVids()
     .subscribe((result) => (this.videos = result))
  }

}
