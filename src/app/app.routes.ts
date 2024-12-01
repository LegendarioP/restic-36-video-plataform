import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { FavoritesComponent } from './pages/favorites/favorites.component'
import { VideoComponent } from './pages/video/video.component';
import { SearchComponent } from './pages/search/search.component';
import { authGuardFn } from '@auth0/auth0-angular';

// export const routes: Routes = [];


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'favorites', component: FavoritesComponent, canActivate: [authGuardFn]  },
    { path: 'video/:id', component: VideoComponent },
    { path: 'search', component: SearchComponent },

];
