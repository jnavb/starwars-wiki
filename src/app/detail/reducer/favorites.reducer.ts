import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { DetailPageActions } from '../actions';
import { Favorite, mock } from '../models/Favorite';

export const favoritesFeatureKey = 'favorites';

export interface State extends EntityState<Favorite> {}

export const adapter = createEntityAdapter<any>({
  selectId: ({ id }) => id,
  sortComparer: false
});

export const initialState: State = adapter.getInitialState(mock);

export const reducer = createReducer(
  initialState,
  on(DetailPageActions.toggleFavorite, (state, props) =>
    state.entities[props.id]
      ? adapter.removeOne(props.id, state)
      : adapter.addOne(props, state)
  )
);
