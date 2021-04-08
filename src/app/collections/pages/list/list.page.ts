import { Component, HostListener, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  mapTo,
  switchMap,
  take,
  tap
} from 'rxjs/operators';
import { CollectionPageActions } from 'src/app/collections/actions';
import * as fromCollections from 'src/app/collections/reducer';
import { selectQueryParam, selectRouteParam } from 'src/app/reducers';
import { Navigation } from 'src/app/services/navigation.service';
import { EntityType } from '../../../models/util-types';
import { capitalize } from '../../../utils/string';
import { ItemList } from '../../models/ItemList';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss']
})
export class ListPage implements OnInit {
  title$: Observable<string>;
  backText$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  view$: Observable<ItemList[]>;

  private entityType$: Observable<EntityType>;

  constructor(
    private nav: Navigation,
    private store: Store<fromCollections.State>
  ) {}

  ngOnInit() {
    const entityType$ = this.store
      .select(selectRouteParam('entityType'))
      .pipe(distinctUntilChanged(), filter<EntityType>(Boolean));

    this.title$ = entityType$.pipe(map(entity => capitalize(entity)));
    this.backText$ = this.nav.getBackText(entityType$).pipe(mapTo('Discover'));
    this.view$ = entityType$.pipe(
      switchMap(entityType =>
        this.store.select(fromCollections.selectView, { entityType })
      )
    );
    this.loading$ = this.store.select(fromCollections.selectCollectionLoading);
    this.error$ = this.store.select(fromCollections.selectCollectionError);
    this.entityType$ = entityType$;

    entityType$.subscribe((entity: EntityType) =>
      this.store.dispatch(CollectionPageActions.enter({ entityType: entity }))
    );
  }

  onDetail(id: string) {
    this.entityType$
      .pipe(take(1))
      .subscribe((entityType: EntityType) =>
        this.nav.navigateForward([entityType, id])
      );
  }
}
