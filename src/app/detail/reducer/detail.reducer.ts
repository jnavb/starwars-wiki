import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import {
  Film,
  Person,
  Planet,
  Species,
  Starship,
  Vehicle
} from '../../models/graphql-schema';
import { DetailApiActions, DetailPageActions } from '../actions';

export const detailFeatureKey = 'detail';

export interface State {
  films: EntityState<Film>;
  planets: EntityState<Planet>;
  people: EntityState<Person>;
  species: EntityState<Species>;
  starships: EntityState<Starship>;
  vehicles: EntityState<Vehicle>;
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
  vehicles: adapter.getInitialState()
};

export const reducer = createReducer(
  initialState,
  on(DetailPageActions.enter, state => ({
    ...state
  })),
  on(DetailApiActions.loadDetailSuccess, (state, { entityType, entity }) => ({
    ...state,
    [entityType]: adapter.addOne(entity, state[entityType])
  }))
);
