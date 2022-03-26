import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], filterTerm: string): any {

    if (!list || !filterTerm) {
      return list;
    }
    return list ? list.filter(data => JSON.stringify(data).search(new RegExp(filterTerm, 'i')) > -1) : [];
  }

}
