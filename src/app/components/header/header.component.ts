import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { UserService } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { ToggleMenuService } from '../../services/toggle-menu/toggle-menu.service';

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
    private router: Router,
    private menuToggleService: ToggleMenuService
  ) {}

  imagePath = 'restic-logo.png';
  profile?: User | undefined | null;
  searchQuery: string = ''; // Bind com o ngModel
  toogleNav: boolean = false
  
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
  toggleMenu() {
    // Envia um valor booleano para o serviço (true para aberto, false para fechado)
    this.menuToggleService.toggleMenuStatus(); // Aqui você pode alternar entre true/false conforme necessário
  }



}

