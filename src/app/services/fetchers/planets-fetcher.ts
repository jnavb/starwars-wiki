import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { QUERIES } from 'src/app/models/graphql-queries';
import { Planet } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { planetsToItemList, planetToItemDetail } from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { ICollectionService, IDetailService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class PlanetsFetcher
  implements
    ICollectionService<'allPlanets', Planet>,
    IDetailService<'planet', Planet> {
  constructor(private apollo: ApolloWrapperService) {}

  requestCollection() {
    return this.apollo.query<Schema<'allPlanets'>>(QUERIES.list.planets);
  }

  extractCollection(result: ApolloQueryResult<Schema<'allPlanets'>>) {
    return result.data.allPlanets?.planets;
  }

  convertCollectionToView(collection: Planet[]) {
    return collection?.map(planetsToItemList);
  }

  requestDetail(id: string) {
    return this.apollo.query<Schema<'planet'>>(QUERIES.detail.planets, id);
  }

  extractDetail(result: ApolloQueryResult<Schema<'planet'>>) {
    return result.data.planet;
  }

  convertDetailToView(entity: Planet): ItemDetail {
    return entity && planetToItemDetail(entity);
  }
}
