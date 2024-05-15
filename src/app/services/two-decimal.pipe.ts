import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDecimal'
})
export class TwoDecimalPipe implements PipeTransform {
  transform(value: number): string {
    return value.toFixed(2);
  }
}
