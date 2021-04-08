import {
  Person,
  Film,
  Vehicle,
  Starship,
  Species,
  Root
} from './graphql-schema';

export type Schema<T extends keyof Root> = Pick<Root, T>;
export type SchemaEntities = Person | Film | Vehicle | Starship | Species;
export type EntitiesPropName<T extends keyof Root> = T;
