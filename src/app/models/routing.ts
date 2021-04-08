import { EntityType, Id } from './util-types';

export type Routes = detail | list | home | favorites;

type home = ['home'];
type favorites = ['favorites'];
type detail = [EntityType, Id];
type list = [EntityType];

export interface QParams {
  id?: Id;
  entityType?: EntityType;
}
