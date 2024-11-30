import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'
import { FavoritesComponent } from './pages/favorites/favorites.component'
import { VideoComponent } from './pages/video/video.component';
import { SearchComponent } from './pages/search/search.component';

// export const routes: Routes = [];


export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'favorites', component: FavoritesComponent },
    { path: 'video/:id', component: VideoComponent },
    { path: 'search', component: SearchComponent },

];

// @NgModule({
// imports: [RouterModule.forRoot(routes)],
// exports: [RouterModule]
// })
// export class AppRoutingModule {}