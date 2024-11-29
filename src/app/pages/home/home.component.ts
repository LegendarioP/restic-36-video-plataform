import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "../../header/header.component";
import { HomeService } from './home.service';
import { Video } from '../../interfaces/video';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  videos = Array<Video>()
  constructor(private videoService: HomeService ){}

  ngOnInit(): void {
    this.videoService
     .getVids()
     .subscribe((result) => (this.videos = result))
  }

}
