import { createReducer, on } from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import { ItemList } from 'src/app/collections/models/ItemList';
import { CollectionPageActions } from '../actions/index';

export const viewFeatureKey = 'view';

export type State = { [key in EntityType]: ItemList[] };

export const initialState: State = {
  films: [],
  people: [],
  planets: [],
  species: [],
  starships: [],
  vehicles: []
};

export const reducer = createReducer(
  initialState,
  on(CollectionPageActions.update, (state, { view, entityType: entity }) => ({
    ...state,
    [entity]: view
  }))
);
