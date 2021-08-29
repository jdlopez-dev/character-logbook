import { Pipe, PipeTransform } from '@angular/core';
import { Content } from '../models/content.interface';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(items: Content[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(
      (item) =>
        item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1 ||
        (item.description && item.description.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
    );
  }
}
