import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/pages/home/home.module').then(m => m.HomePageModule)
  },
  {
    path: ':entityType/list',
    loadChildren: () =>
      import('./collections/pages/list/list.module').then(m => m.ListPageModule)
  },
  {
    path: ':entityType/:id',
    data: { noReuse: true },
    loadChildren: () =>
      import('./detail/pages/detail/detail.module').then(
        m => m.DetailPageModule
      )
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./favorites/pages/favorites/favorites.module').then(
        m => m.FavoritesPageModule
      )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
