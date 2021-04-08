import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CollectionEffects } from 'src/app/collections/effects/collection.effects';
import * as fromCollections from 'src/app/collections/reducer';
import { ComponentsModule } from '../../../components/components.module';
import { ListPageRoutingModule } from './list-routing.module';
import { ListPage } from './list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    ComponentsModule,
    StoreModule.forFeature(
      fromCollections.collectionsFeatureKey,
      fromCollections.reducers
    ),
    EffectsModule.forFeature([CollectionEffects])
  ],
  declarations: [ListPage]
})
export class ListPageModule {}
