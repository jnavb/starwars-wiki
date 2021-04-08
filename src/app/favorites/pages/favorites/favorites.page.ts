import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as fromDetail from 'src/app/detail/reducer';
import { Favorite } from 'src/app/detail/models/Favorite';
import { Navigation } from 'src/app/services/navigation.service';
import { groupArrayByEntity } from 'src/app/utils/rxjs';

@Component({
  selector: 'mizik-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit {
  favoritesByEntities$: Observable<{ key: string; values: Favorite[] }[]>;

  constructor(
    private nav: Navigation,
    private store: Store<fromDetail.State>
  ) {}

  ngOnInit() {
    this.favoritesByEntities$ = this.store
      .select(fromDetail.selectFavorites)
      .pipe(map(Object.values), switchMap(groupArrayByEntity));
  }

  onFavorite({ id, entity }: Favorite) {
    this.nav.navigateForward([entity, id]);
  }
}
