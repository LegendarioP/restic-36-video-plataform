import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { ToggleMenuService } from '../../services/toggle-menu/toggle-menu.service';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  rotaAtual: string = '';
  constructor(
    private router: Router,
    private menuToggleService: ToggleMenuService
  ) {}

  menuOpen: boolean = false;
  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.rotaAtual = event.url;
      }
    });

    this.menuToggleService.menuStatus$.subscribe(status => {
      this.menuOpen = status; // Atualiza o estado do menu conforme o valor recebido
    });
  }
}
