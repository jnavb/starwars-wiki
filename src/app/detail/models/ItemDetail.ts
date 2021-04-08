import { EntityType } from '../../models/util-types';

export interface ItemDetail {
  id: string;
  entity: EntityType;
  title: string;
  subtitle: string;
  img?: string;
  secondaryCard?: { label: string; value: string };
  info: { label: string; value: string | number }[];
  related: {
    id: string;
    entity: EntityType;
    title: string;
    subtitle: string;
  }[];
}
