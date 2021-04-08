import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailPageRoutingModule } from './detail-routing.module';
import * as fromDetail from 'src/app/detail/reducer';

import { DetailPage } from './detail.page';
import { ComponentsModule } from '../../../components/components.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DetailEffects } from 'src/app/detail/effects/detail.effects';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailPageRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(fromDetail.detailFeatureKey, fromDetail.reducers),
    EffectsModule.forFeature([DetailEffects])
  ],
  declarations: [DetailPage]
})
export class DetailPageModule {}
