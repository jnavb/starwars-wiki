import {
  Action,
  combineReducers,
  createFeatureSelector,
  createSelector
} from '@ngrx/store';
import * as fromRoot from 'src/app/reducers';
import * as fromTrivia from './trivia.reducer';

export const homeFeatureKey = 'home';

export interface HomeState {
  [fromTrivia.triviaFeatureKey]: fromTrivia.State;
}

export interface State extends fromRoot.State {
  [homeFeatureKey]: HomeState;
}

export function reducers(state: HomeState | undefined, action: Action) {
  return combineReducers({
    [fromTrivia.triviaFeatureKey]: fromTrivia.reducer
  })(state, action);
}

export const selectHomeFeature = createFeatureSelector<State, HomeState>(
  homeFeatureKey
);

export const selectedTrivia = createSelector(
  selectHomeFeature,
  state => state[fromTrivia.triviaFeatureKey].selected
);
