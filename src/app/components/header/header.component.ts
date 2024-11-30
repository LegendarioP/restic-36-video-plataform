import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public user: UserService
  ) {}
  imagePath = 'restic-logo.png';
  profile?: User | undefined | null;
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
      // console.log(profile) 

      this.user.verifyOrInsertUser(String(profile?.sub?.split("|")[0]), String(profile?.sub?.split("|")[1]))

    });
  }

}

