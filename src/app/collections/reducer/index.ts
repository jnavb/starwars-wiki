import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import { EntityType } from 'src/app/models/util-types';
import * as fromRoot from 'src/app/reducers';
import * as fromCollectionsEntities from './collection.reducer';
import * as fromView from './view.reducer';

export const collectionsFeatureKey = 'collections';

export interface CollectionsState {
  [fromCollectionsEntities.collectionFeatureKey]: fromCollectionsEntities.State;
  [fromView.viewFeatureKey]: fromView.State;
}

export interface State extends fromRoot.State {
  [collectionsFeatureKey]: CollectionsState;
}

export function reducers(state: CollectionsState | undefined, action: Action) {
  return combineReducers({
    [fromCollectionsEntities.collectionFeatureKey]:
      fromCollectionsEntities.reducer,
    [fromView.viewFeatureKey]: fromView.reducer
  })(state, action);
}

export const selectCollectionsFeature = createFeatureSelector<
  State,
  CollectionsState
>(collectionsFeatureKey);

export const selectView = createSelector(
  selectCollectionsFeature,
  (state, { entityType }: { entityType: EntityType }) => state.view[entityType]
);

export const selectCollectionsEntities = createSelector(
  selectCollectionsFeature,
  state => state.collections
);

export const selectCollection = (entity: EntityType) =>
  createSelector(selectCollectionsEntities, state => state[entity]);

export const selectCollectionLoading = createSelector(
  selectCollectionsEntities,
  state => state.loading
);

export const selectCollectionError = createSelector(
  selectCollectionsEntities,
  state => state.error
);

export { fromCollectionsEntities as fromCollection, fromView };
