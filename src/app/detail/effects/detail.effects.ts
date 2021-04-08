import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { Schema } from 'src/app/models/graphql-types';
import { EntityType } from 'src/app/models/util-types';
import { FetcherFactory } from 'src/app/services/fetchers';
import { DetailApiActions, DetailPageActions } from '../actions';

@Injectable()
export class DetailEffects {
  loadCDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DetailPageActions.enter),
      mapFetcher(this.fetcherFactory),
      exhaustMap(props =>
        props.fetcher
          .requestDetail(props.id)
          .pipe(map(result => ({ ...props, result })))
      ),
      throwIfError(),
      map(props => ({
        ...props,
        entity: props.fetcher.extractDetail(props.result)
      })),
      map(props => ({
        ...props,
        view: props.fetcher.convertDetailToView(props.entity)
      })),
      switchMap(({ entityType, view, entity }) => [
        DetailApiActions.loadDetailSuccess({ entityType, entity }),
        DetailPageActions.update({ entityType, view })
      ]),
      catchErrorToAction(DetailApiActions.loadDetailFailure)
    )
  );

  constructor(
    private actions$: Actions,
    private fetcherFactory: FetcherFactory
  ) {}
}

const throwIfError = <T extends { result: ApolloQueryResult<Schema<any>> }>() =>
  map((props: T) => {
    const { message } = props.result.error || {};
    if (message) throw new Error('Error trying to fetch collection' + message);
    return props;
  });

const catchErrorToAction = action => catchError(msg => of(action(msg)));

const mapFetcher = <T extends { entityType: EntityType }>(
  fetcherFactory: FetcherFactory
) =>
  map((props: T) => ({
    ...props,
    fetcher: fetcherFactory.getFetcher(props.entityType)
  }));
