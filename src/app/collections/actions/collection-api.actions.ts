import { createAction, props } from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';

export const loadCollectionSuccess = createAction(
  '[Collection/API] Load Collection Success',
  props<{ entityType: EntityType; collection: unknown[] }>()
);

export const loadCollectionFailure = createAction(
  '[Collection/API] Load Collection Failure',
  props<{ error: any }>()
);
