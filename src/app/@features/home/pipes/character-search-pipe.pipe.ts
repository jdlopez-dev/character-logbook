import { Pipe, PipeTransform } from '@angular/core';
import { Character } from '../models/character.interface';

@Pipe({
  name: 'CharacterSearchPipe',
})
export class CharacterSearchPipePipe implements PipeTransform {
  transform(items: Character[], filter: string): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(
      (item) =>
        (item.nickname && item.nickname.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1) ||
        item.name.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1 ||
        (item.description && item.description.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1)
    );
  }
}
