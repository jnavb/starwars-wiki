import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { Species } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { speciesToItemDetail, specieToItemList } from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { ICollectionService, IDetailService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class SepeciesFetcher
  implements
    ICollectionService<'allSpecies', Species>,
    IDetailService<'species', Species> {
  constructor(private apollo: ApolloWrapperService) {}

  requestCollection() {
    return this.apollo.query<Schema<'allSpecies'>>(QUERIES.list.species);
  }

  extractCollection(result: ApolloQueryResult<Schema<'allSpecies'>>) {
    return result.data.allSpecies?.species;
  }

  convertCollectionToView(collection: Species[]) {
    return collection?.map(specieToItemList);
  }

  requestDetail(id: string) {
    return this.apollo.query<Schema<'species'>>(QUERIES.detail.species, id);
  }

  extractDetail(result: ApolloQueryResult<Schema<'species'>>) {
    return result.data.species;
  }

  convertDetailToView(entity: Species): ItemDetail {
    return entity && speciesToItemDetail(entity);
  }
}
