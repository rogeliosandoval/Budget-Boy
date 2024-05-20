import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'twoDecimal'
})
export class TwoDecimalPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '0.00'; // Handle NaN values gracefully
    }
    return value.toFixed(2);
  }
}
