import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { Person } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { personToItemDetail, personToItemList } from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { ICollectionService, IDetailService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class PeopleFetcher
  implements
    ICollectionService<'allPeople', Person>,
    IDetailService<'person', Person> {
  constructor(private apollo: ApolloWrapperService) {}

  requestCollection() {
    return this.apollo.query<Schema<'allPeople'>>(QUERIES.list.people);
  }

  extractCollection(result: ApolloQueryResult<Schema<'allPeople'>>) {
    return result.data.allPeople?.people;
  }

  convertCollectionToView(collection: Person[]) {
    return collection?.map(personToItemList);
  }

  requestDetail(id: string) {
    return this.apollo.query<Schema<'person'>>(QUERIES.detail.people, id);
  }

  extractDetail(result: ApolloQueryResult<Schema<'person'>>) {
    return result.data.person;
  }

  convertDetailToView(entity: Person): ItemDetail {
    return entity && personToItemDetail(entity);
  }
}
