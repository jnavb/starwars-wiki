import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { map } from 'rxjs/operators';
import { QUERIES } from 'src/app/models/graphql-queries';
import { Vehicle } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { vehicleToItemDetail, vehicleToItemList } from 'src/app/utils/mappers';
import { ApolloWrapperService } from '../apollo-wrapper.service';
import { ICollectionService, IDetailService } from './fetcher-factory';

@Injectable({
  providedIn: 'root'
})
export class VehiclesFetcher
  implements
    ICollectionService<'allVehicles', Vehicle>,
    IDetailService<'vehicle', Vehicle> {
  constructor(private apollo: ApolloWrapperService) {}

  requestCollection() {
    return this.apollo.query<Schema<'allVehicles'>>(QUERIES.list.vehicles);
  }

  extractCollection(result: ApolloQueryResult<Schema<'allVehicles'>>) {
    return result.data.allVehicles?.vehicles;
  }

  convertCollectionToView(collection: Vehicle[]) {
    return collection?.map(vehicleToItemList);
  }

  requestDetail(id: string) {
    return this.apollo.query<Schema<'vehicle'>>(QUERIES.detail.vehicles, id);
  }

  extractDetail(result: ApolloQueryResult<Schema<'vehicle'>>) {
    return result.data.vehicle;
  }

  convertDetailToView(entity: Vehicle): ItemDetail {
    return entity && vehicleToItemDetail(entity);
  }
}
