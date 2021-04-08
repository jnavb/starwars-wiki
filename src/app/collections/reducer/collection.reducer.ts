import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import {
  Film,
  Planet,
  Person,
  Species,
  Starship,
  Vehicle
} from '../../models/graphql-schema';
import { CollectionApiActions, CollectionPageActions } from '../actions/index';

export const collectionFeatureKey = 'collections';

export interface State {
  films: EntityState<Film>;
  planets: EntityState<Planet>;
  people: EntityState<Person>;
  species: EntityState<Species>;
  starships: EntityState<Starship>;
  vehicles: EntityState<Vehicle>;
  loading: boolean;
  error: boolean;
}

export const adapter = createEntityAdapter<any>({
  selectId: ({ id }) => id,
  sortComparer: false
});

export const initialState: State = {
  films: adapter.getInitialState(),
  planets: adapter.getInitialState(),
  people: adapter.getInitialState(),
  species: adapter.getInitialState(),
  starships: adapter.getInitialState(),
  vehicles: adapter.getInitialState(),
  loading: false,
  error: false
};

export const reducer = createReducer(
  initialState,
  on(CollectionPageActions.enter, state => ({
    ...state,
    loading: true
  })),
  on(
    CollectionApiActions.loadCollectionSuccess,
    (state, { collection, entityType }) => ({
      ...state,
      [entityType]: adapter.addMany(collection, state[entityType]),
      loading: false
    })
  ),
  on(CollectionApiActions.loadCollectionFailure, state => ({
    ...state,
    loading: false,
    error: true
  }))
);
