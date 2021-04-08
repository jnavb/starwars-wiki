export type Nullable<T> = T | null;
export enum EntityType {
  PEOPLE = 'people',
  FILMS = 'films',
  PLANETS = 'planets',
  SPECIES = 'species',
  STARSHIPS = 'starships',
  VEHICLES = 'vehicles'
}

export interface Trivia {
  id: string;
  question: string;
  answer: string;
}

export type Id = string;
