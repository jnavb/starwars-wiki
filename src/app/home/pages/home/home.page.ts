import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { HomePageActions } from 'src/app/home/actions';
import * as fromHome from 'src/app/home/reducer';
import { Navigation } from 'src/app/services/navigation.service';
import { EntityType, Trivia } from '../../../models/util-types';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  entities = EntityType;
  discover$ = new BehaviorSubject(false);
  trivia$: Observable<Trivia>;
  slideOpts = {
    slidesPerView: 'auto',
    slidesPerGroup: 1,
    spaceBetween: 0,
    freeMode: true,
    slidesOffsetBefore: 1,
    slidesOffsetAfter: 1
  };

  constructor(private store: Store<fromHome.State>, private nav: Navigation) {}

  ngOnInit() {
    this.trivia$ = this.store.select(fromHome.selectedTrivia).pipe(delay(200));
  }

  onFront() {
    if (!this.discover$.getValue()) {
      this.discover$.next(true);
    }
  }

  onPickAnother() {
    this.discover$.next(false);
    this.store.dispatch(HomePageActions.pickTrivia());
  }

  onEntityList(entityType: EntityType) {
    this.nav.navigateForward([entityType, 'list']);
  }
}
