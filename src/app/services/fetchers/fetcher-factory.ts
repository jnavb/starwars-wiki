import { Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Observable } from 'rxjs';
import { Root } from 'src/app/models/graphql-schema';
import { Schema } from 'src/app/models/graphql-types';
import { EntityType } from 'src/app/models/util-types';
import { ItemDetail } from 'src/app/detail/models/ItemDetail';
import { ItemList } from '../../collections/models/ItemList';
import {
  FilmsFetcher,
  PeopleFetcher,
  VehiclesFetcher,
  SepeciesFetcher,
  PlanetsFetcher,
  StarshipsFetcher
} from '.';

export interface ICollectionService<R extends keyof Root, Entity = any> {
  requestCollection(): Observable<ApolloQueryResult<Schema<R>>>;
  extractCollection(result: ApolloQueryResult<Schema<R>>): Entity[];
  convertCollectionToView(list: Entity[]): ItemList[];
}

export interface IDetailService<R extends keyof Root, Entity = any> {
  requestDetail(id: string): Observable<ApolloQueryResult<Schema<R>>>;
  extractDetail(result: ApolloQueryResult<Schema<R>>): Entity;
  convertDetailToView(entity: Entity): ItemDetail;
}

@Injectable({
  providedIn: 'root'
})
export class FetcherFactory {
  constructor(
    private filmsFetcher: FilmsFetcher,
    private peopleFetcher: PeopleFetcher,
    private vehiclesFetcher: VehiclesFetcher,
    private speciesFetcher: SepeciesFetcher,
    private planetsFetcher: PlanetsFetcher,
    private starshipsFetcher: StarshipsFetcher
  ) {}

  getFetcher(
    entity: EntityType
  ): ICollectionService<any> & IDetailService<any> {
    switch (entity) {
      case EntityType.FILMS:
        return this.filmsFetcher;
      case EntityType.PEOPLE:
        return this.peopleFetcher;
      case EntityType.VEHICLES:
        return this.vehiclesFetcher;
      case EntityType.SPECIES:
        return this.speciesFetcher;
      case EntityType.PLANETS:
        return this.planetsFetcher;
      case EntityType.STARSHIPS:
        return this.starshipsFetcher;
      default:
        return this.filmsFetcher;
    }
  }
}
