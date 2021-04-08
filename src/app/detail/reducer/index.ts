import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import * as fromRoot from 'src/app/reducers';
import * as fromDetailEntities from './detail.reducer';
import * as fromView from './view.reducer';
import * as fromFavorites from './favorites.reducer';

export const detailFeatureKey = 'detail';

export interface DetailState {
  [fromDetailEntities.detailFeatureKey]: fromDetailEntities.State;
  [fromView.viewFeatureKey]: fromView.State;
  [fromFavorites.favoritesFeatureKey]: fromFavorites.State;
}

export interface State extends fromRoot.State {
  [detailFeatureKey]: DetailState;
}

export function reducers(state: DetailState | undefined, action: Action) {
  return combineReducers({
    [fromDetailEntities.detailFeatureKey]: fromDetailEntities.reducer,
    [fromView.viewFeatureKey]: fromView.reducer,
    [fromFavorites.favoritesFeatureKey]: fromFavorites.reducer
  })(state, action);
}

export const selectDetailFeature = createFeatureSelector<State, DetailState>(
  detailFeatureKey
);

export const selectViewFeature = createSelector(
  selectDetailFeature,
  state => state[fromView.viewFeatureKey]
);

export const selectDetail = createSelector(
  selectDetailFeature,
  state => state[fromDetailEntities.detailFeatureKey]
);

export const selectFavorites = createSelector(
  selectDetailFeature,
  state => state[fromFavorites.favoritesFeatureKey].entities
);

export const selectView = createSelector(
  selectViewFeature,
  (state, { entityType }: { entityType: EntityType }) => state[entityType]
);

export const selectDetailLoading = createSelector(
  selectViewFeature,
  state => state.loading
);

export const selectDetailError = createSelector(
  selectViewFeature,
  state => state.error
);

export { fromDetailEntities, fromView };
