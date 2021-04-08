import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StoreModule } from '@ngrx/store';
import * as fromHome from 'src/app/home/reducer';
import { ComponentsModule } from '../../../components/components.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(fromHome.homeFeatureKey, fromHome.reducers)
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
