import { TitleCasePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { EntityType } from '../models/util-types';

@Pipe({
  name: 'entityTitlecase'
})
export class EntityTitlecasePipe implements PipeTransform {
  constructor(private titlecase: TitleCasePipe) {}

  transform(value: string, entity?: EntityType): string {
    // If it is a robot, make title case as uppercase
    if (value.includes('-') && entity === EntityType.PEOPLE) {
      return value.toUpperCase();
    }

    return this.titlecase.transform(value);
  }
}
