import { createAction, props } from '@ngrx/store';
import { SchemaEntities } from 'src/app/models/graphql-types';
import { EntityType } from 'src/app/models/util-types';

export const loadDetailSuccess = createAction(
  '[Detail/API] Load Detail Success',
  props<{ entityType: EntityType; entity: SchemaEntities }>()
);

export const loadDetailFailure = createAction(
  '[Detail/API] Load Detail Failure',
  props<{ error: any }>()
);
