import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipesSearch',
  standalone: true
})
export class PipesSearchPipe implements PipeTransform {

  transform(arrayOfObject: any[], term: string): any[] {
    if (!arrayOfObject || !term) return arrayOfObject;
    term = term.toLowerCase();
    return arrayOfObject.filter((item) => item.title.toLowerCase().includes(term))
  }
}
