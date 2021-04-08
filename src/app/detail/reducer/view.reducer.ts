import { createReducer, on } from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { DetailApiActions, DetailPageActions } from '../actions/index';

export const viewFeatureKey = 'view';

export type DetailViews = { [key in EntityType]: ItemDetail };

export interface State extends DetailViews {
  loading: boolean;
  error: boolean;
}

export const initialState: State = {
  films: null,
  people: null,
  planets: null,
  species: null,
  starships: null,
  vehicles: null,
  loading: false,
  error: false
};

export const reducer = createReducer(
  initialState,
  on(DetailPageActions.enter, (state, { entityType }) => ({
    ...state,
    [entityType]: null,
    loading: true
  })),
  on(DetailPageActions.update, (state, { view, entityType }) => ({
    ...state,
    [entityType]: view
  })),
  on(DetailApiActions.loadDetailSuccess, (state, { entityType, entity }) => ({
    ...state,
    loading: false
  })),
  on(DetailApiActions.loadDetailFailure, state => ({
    ...state,
    loading: false,
    error: true
  }))
);
