import { Nullable } from '../models/util-types';

export const capitalize = (s: Nullable<string>) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.toLowerCase().slice(1);
};
