import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[numbersOnly]'
})
export class NumbersOnlyPipe {
  constructor(private _el: ElementRef) {}

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const formattedValue = this.formatInput(value);
    this._el.nativeElement.value = formattedValue;
  }

  private formatInput(value: string): string {
    const numericValue = value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except '.' (decimal point)
    const [integerPart, decimalPart] = numericValue.split('.'); // Separate integer and decimal parts
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas for thousands
    if (decimalPart !== undefined) {
      const truncatedDecimalPart = decimalPart.substring(0, 2); // Truncate to two decimal places
      return `${formattedIntegerPart}.${truncatedDecimalPart}`;
    } else {
      return formattedIntegerPart;
    }
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    const inputElement: HTMLInputElement = this._el.nativeElement;
    const { value, selectionStart } = inputElement;

    if (e.key === ' ' || (isNaN(Number(e.key)) && e.key !== '.' && e.key !== 'Backspace')) {
      e.preventDefault(); // Prevent input of non-numeric characters except '.', and Backspace
    }

    if (e.key === '.') {
      if (value.includes('.')) {
        e.preventDefault(); // Prevent input of multiple decimal points
      }
      return; // Allow the first decimal point
    }

    if (value.includes('.')) {
      const [integerPart, decimalPart] = value.split('.');
      if ((selectionStart ?? 0) > integerPart.length && decimalPart.length >= 2 && e.key !== 'Backspace') {
        e.preventDefault(); // Prevent input if there are already two decimal places
      }
    }
  }
}
