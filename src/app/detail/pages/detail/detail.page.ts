import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  distinctUntilKeyChanged,
  filter,
  map,
  pluck,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';
import { DetailPageActions } from 'src/app/detail/actions';
import * as fromDetail from 'src/app/detail/reducer';
import { QParams } from 'src/app/models/routing';
import { Navigation } from 'src/app/services/navigation.service';
import { EntityType } from '../../../models/util-types';
import { capitalize } from '../../../utils/string';
import { Favorite } from '../../models/Favorite';
import { ItemDetail } from '../../models/ItemDetail';

@Component({
  selector: 'mizik-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss']
})
export class DetailPage implements OnInit, OnDestroy {
  title$: Observable<string>;
  backText$: Observable<string>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  view$: Observable<ItemDetail>;
  favorite$: Observable<boolean>;
  private destroy$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private nav: Navigation,
    private store: Store<fromDetail.State>
  ) {}

  toggleFavorite(favorite: Favorite) {
    this.store.dispatch(DetailPageActions.toggleFavorite(favorite));
  }

  ngOnInit() {
    const params$ = (this.activatedRoute.params as Observable<QParams>).pipe(
      filter(({ entityType, id }) => Boolean(entityType) && Boolean(id))
    );

    params$.subscribe(({ id, entityType }) =>
      this.store.dispatch(DetailPageActions.enter({ entityType, id }))
    );

    this.backText$ = this.nav
      .getBackText(params$)
      .pipe(map(({ entityType: entity }) => capitalize(entity)));

    this.view$ = params$.pipe(
      distinctUntilKeyChanged('entityType'),
      switchMap(({ entityType }) =>
        this.store.select(fromDetail.selectView, { entityType })
      )
    );

    this.title$ = this.view$.pipe(pluck('title'));
    this.favorite$ = combineLatest([
      params$,
      this.store.select(fromDetail.selectFavorites)
    ]).pipe(
      map(([{ id }, favorites]) => !!favorites[id]),
      takeUntil(this.destroy$)
    );
  }

  onDetail({ entity, id }: { entity: EntityType; id: string }) {
    this.nav.navigateForward([entity, id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
