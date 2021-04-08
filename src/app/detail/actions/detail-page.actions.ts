import { createAction, props } from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { Favorite } from '../models/Favorite';

export const enter = createAction(
  '[Detail Page] Enter',
  props<{ entityType: EntityType; id: string }>()
);

export const update = createAction(
  '[Detail Page] Update View',
  props<{ entityType: EntityType; view: ItemDetail }>()
);

export const toggleFavorite = createAction(
  '[Detail Page] Toggle Favorite',
  props<Favorite>()
);
