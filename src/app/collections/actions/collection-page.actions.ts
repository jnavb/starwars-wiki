import { createAction, props } from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import { ItemList } from 'src/app/collections/models/ItemList';

export const enter = createAction(
  '[Collection Page] Enter',
  props<{ entityType: EntityType }>()
);

export const update = createAction(
  '[Collection Page] Update View',
  props<{ entityType: EntityType; view: ItemList[] }>()
);
