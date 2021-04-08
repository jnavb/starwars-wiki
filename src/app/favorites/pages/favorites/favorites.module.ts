import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FavoritesPageRoutingModule } from './favorites-routing.module';
import { FavoritesPage } from './favorites.page';
import * as fromDetail from 'src/app/detail/reducer';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoritesPageRoutingModule
    // StoreModule.forFeature(fromDetail.detailFeatureKey, fromDetail.reducers)
  ],
  declarations: [FavoritesPage]
})
export class FavoritesPageModule {}
