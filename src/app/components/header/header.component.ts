import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe, FormsModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent implements OnInit {
  constructor(
    public auth: AuthService,
    public user: UserService,
    private router: Router
  ) {}

  imagePath = 'restic-logo.png';
  profile?: User | undefined | null;
  searchQuery: string = ''; // Bind com o ngModel
  
  ngOnInit(): void {
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
      if(profile){
        this.user.verifyOrInsertUser(String(profile?.sub?.split("|")[0]), String(profile?.sub?.split("|")[1]), profile)
      }
    });
  }

  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { title: this.searchQuery }
      });
    }
    
  }

}

