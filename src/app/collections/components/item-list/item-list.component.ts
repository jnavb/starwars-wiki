import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export interface ItemListView {
  title: string;
  subtitle: string;
}

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent {
  @Input() view: ItemListView;

  constructor() {}
}
