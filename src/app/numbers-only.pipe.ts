import { Directive, Input, ElementRef, HostListener } from "@angular/core";

@Directive({
  selector: "[numbersOnly]"
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
    return decimalPart !== undefined ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart; // Reconstruct the formatted value
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (e.key === ' ' || isNaN(Number(e.key)) && e.key !== '.' && e.key !== ',' && e.key !== 'Backspace') {
      e.preventDefault(); // Prevent input of non-numeric characters except '.', ',', and Backspace
    }
  }
}