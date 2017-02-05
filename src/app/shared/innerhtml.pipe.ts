import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'innerhtml'
})
export class InnerhtmlPipe implements PipeTransform {
  transform(value: string, args?: any): any {
      return `${value}`;
  }
}
