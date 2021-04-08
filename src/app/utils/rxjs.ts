import { from, Observable } from 'rxjs';
import { groupBy, mergeMap, reduce, toArray } from 'rxjs/operators';
import { Favorite } from '../detail/models/Favorite';

export const groupArrayBy = <T>(prop: keyof T) => (
  arr: T[]
): Observable<{ key: T[keyof T]; values: T[] }[]> => {
  return from(arr).pipe(
    groupBy(el => el[prop]),
    mergeMap(group =>
      group.pipe(
        reduce(
          (acc, cur) => {
            acc.values.push(cur);
            return acc;
          },
          { key: group.key, values: [] }
        )
      )
    ),
    toArray()
  );
};

export const groupArrayByEntity = groupArrayBy<Favorite>('entity');
