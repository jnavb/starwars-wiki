import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';
import { entitiesWithImg } from 'src/app/data/detail-img';
import { Schema } from 'src/app/models/graphql-types';
import { EntityType } from 'src/app/models/util-types';
import { FetcherFactory } from 'src/app/services/fetchers';
import { CollectionApiActions, CollectionPageActions } from '../actions';

@Injectable()
export class CollectionEffects {
  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionPageActions.enter),
      mapFetcher(this.fetcherFactory),
      exhaustMap(props =>
        props.fetcher
          .requestCollection()
          .pipe(map(result => ({ ...props, result })))
      ),
      throwIfError(),
      map(props => ({
        ...props,
        collection: props.fetcher.extractCollection(props.result)
      })),
      map(props => ({
        ...props,
        view: props.fetcher.convertCollectionToView(props.collection)
      })),
      map(props => ({
        ...props,
        view: props.view.filter(
          ({ id, entity }) =>
            entity !== EntityType.PEOPLE || entitiesWithImg.has(id)
        )
      })),
      switchMap(({ view, collection, entityType: entity }) => [
        CollectionApiActions.loadCollectionSuccess({
          collection,
          entityType: entity
        }),
        CollectionPageActions.update({ view, entityType: entity })
      ]),
      catchErrorToAction(CollectionApiActions.loadCollectionFailure)
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
