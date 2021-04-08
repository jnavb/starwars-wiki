import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { Starship } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import {
  starshipToItemDetail,
  starshipToItemList
} from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { ICollectionService, IDetailService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class StarshipsFetcher
  implements
    ICollectionService<'allStarships', Starship>,
    IDetailService<'starship', Starship> {
  constructor(private apollo: ApolloWrapperService) {}

  requestCollection() {
    return this.apollo.query<Schema<'allStarships'>>(QUERIES.list.starships);
  }

  extractCollection(result: ApolloQueryResult<Schema<'allStarships'>>) {
    return result.data.allStarships?.starships;
  }

  convertCollectionToView(collection: Starship[]) {
    return collection?.map(starshipToItemList);
  }

  requestDetail(id: string) {
    return this.apollo.query<Schema<'starship'>>(QUERIES.detail.starships, id);
  }

  extractDetail(result: ApolloQueryResult<Schema<'starship'>>) {
    return result.data.starship;
  }

  convertDetailToView(entity: Starship): ItemDetail {
    return entity && starshipToItemDetail(entity);
  }
}
