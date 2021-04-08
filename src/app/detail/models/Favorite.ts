import { EntityState } from '@ngrx/entity';
import { EntityType, Id } from 'src/app/models/util-types';

export type Favorite = { id: Id; entity: EntityType; title: string };

export const mock: EntityState<Favorite> = {
  entities: {
    ['ZmlsbXM6Ng==']: {
      id: 'ZmlsbXM6Ng==',
      entity: EntityType.FILMS,
      title: 'Revenge Of The Sith'
    },
    ['cGVvcGxlOjQ=']: {
      id: 'cGVvcGxlOjQ=',
      entity: EntityType.PEOPLE,
      title: 'Darth Vader'
    },
    ['ZmlsbXM6MQ==']: {
      id: 'ZmlsbXM6MQ==',
      entity: EntityType.FILMS,
      title: 'A New Hope'
    },
    ['dmVoaWNsZXM6MTg==']: {
      id: 'dmVoaWNsZXM6MTg==',
      entity: EntityType.VEHICLES,
      title: 'AT-AT'
    },
    ['ZmlsbXM6NQ==']: {
      id: 'ZmlsbXM6NQ==',
      entity: EntityType.FILMS,
      title: 'Attack Of The Clones'
    },
    ['cGxhbmV0czox']: {
      id: 'cGxhbmV0czox',
      entity: EntityType.PLANETS,
      title: 'Tatooine'
    },
    ['cGVvcGxlOjI1']: {
      id: 'cGVvcGxlOjI1',
      entity: EntityType.PEOPLE,
      title: 'Lando Calrissian'
    }
  },
  ids: [
    'ZmlsbXM6Ng==',
    'cGVvcGxlOjgx',
    'ZmlsbXM6MQ==',
    'cGVvcGxlOjgy',
    'cGxhbmV0czo2MA==',
    'ZmlsbXM6NQ==',
    'cGxhbmV0czox',
    'cGVvcGxlOjI='
  ]
};
