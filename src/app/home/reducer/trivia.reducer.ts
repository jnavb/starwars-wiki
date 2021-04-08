import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { trivias } from 'src/app/data/trivia';
import { Trivia } from 'src/app/models/util-types';
import {
  addProp,
  calculateTriviaId,
  pickRandom,
  toDictionary
} from 'src/app/utils/array';
import { HomePageActions } from '../actions';

export const triviaFeatureKey = 'trivia';

export interface State extends EntityState<Trivia> {
  selected: Trivia;
}

export const adapter = createEntityAdapter<Trivia>({
  selectId: ({ question }) => question,
  sortComparer: false
});

const triviasWithId = trivias.map(addProp(calculateTriviaId, 'id'));
const triviasDictionary = triviasWithId.reduce(toDictionary, {});
const triviasIds = trivias.map(({ id }) => id);

export const initialState: State = adapter.getInitialState({
  ids: triviasIds,
  entities: triviasDictionary,
  selected: pickRandom(trivias)
});

export const reducer = createReducer(
  initialState,
  on(HomePageActions.pickTrivia, state => ({
    ...state,
    selected: pickRandom(state.entities)
  }))
);
