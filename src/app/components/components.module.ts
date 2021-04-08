import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ItemListComponent } from '../collections/components/item-list/item-list.component';
import { CardFlipComponent } from '../home/components/card-flip/card-flip.component';
import { EntityTitlecasePipe } from '../pipes/custom-titlecase.pipe';
import { FabLoveComponent } from '../detail/components/fab-love/fab-love.component';

@NgModule({
  declarations: [
    ItemListComponent,
    CardFlipComponent,
    EntityTitlecasePipe,
    FabLoveComponent
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    ItemListComponent,
    CardFlipComponent,
    EntityTitlecasePipe,
    FabLoveComponent
  ]
})
export class ComponentsModule {}
