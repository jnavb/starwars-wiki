import { ItemListView } from '../components/item-list/item-list.component';
import { EntityType, Id } from '../../models/util-types';

export interface ItemList extends ItemListView {
  id: string;
  entity: EntityType;
}
