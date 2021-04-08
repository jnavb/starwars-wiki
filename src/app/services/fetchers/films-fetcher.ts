import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { QUERIES } from 'src/app/models/graphql-queries';
import { Film } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { filmToItemDetail, filmToItemList } from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { ICollectionService, IDetailService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class FilmsFetcher
  implements
    ICollectionService<'allFilms', Film>,
    IDetailService<'film', Film> {
  constructor(private apollo: ApolloWrapperService) {}

  requestCollection() {
    return this.apollo.query<Schema<'allFilms'>>(QUERIES.list.films);
  }

  extractCollection(result: ApolloQueryResult<Schema<'allFilms'>>) {
    return result.data.allFilms?.films;
  }

  convertCollectionToView(collection: Film[]) {
    return collection?.map(filmToItemList);
  }

  requestDetail(id: string) {
    return this.apollo.query<Schema<'film'>>(QUERIES.detail.films, id);
  }

  extractDetail(result: ApolloQueryResult<Schema<'film'>>) {
    return result.data.film;
  }

  convertDetailToView(entity: Film): ItemDetail {
    return entity && filmToItemDetail(entity);
  }
}
