import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { HomePageActions } from 'src/app/home/actions';
import * as fromHome from 'src/app/home/reducer';

@Injectable({ providedIn: 'root' })
export class HomeResolver implements Resolve<any> {
  constructor(private store: Store<fromHome.State>) {}

  resolve() {
    this.store.dispatch(HomePageActions.pickTrivia());
  }
}
