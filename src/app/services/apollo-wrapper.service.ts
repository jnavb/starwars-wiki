import { Injectable } from '@angular/core';
import {
  ApolloQueryResult,
  DocumentNode,
  NetworkStatus
} from '@apollo/client/core';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class ApolloWrapperService {
  private initialState: ApolloQueryResult<unknown> = {
    data: {},
    loading: true,
    networkStatus: NetworkStatus.loading
  };

  constructor(private apollo: Apollo) {}

  query<T>(query: DocumentNode, id?: string) {
    return this.apollo.query<T>({
      query,
      variables: { id }
    });
  }
}
