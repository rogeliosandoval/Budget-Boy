import { Component, Inject, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseService } from "src/app/services/expense.service";

@Component({
  selector: 'expense-form',
  templateUrl: 'expense-form.component.html',
  styleUrls: ['expense-form.component.scss']
})

export class ExpenseFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<ExpenseFormComponent>);
  private expenseService = inject(ExpenseService);
  public matDialog = inject(MatDialog);
  public expenseForm: FormGroup;
  public type: string = 'expense';
  public initialAmount: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.expenseForm = this.formBuilder.group({
      type: [this.type, Validators.required],
      amount: ['', Validators.required],
      title: ['', Validators.required],
      note: ['']
    });
    this.expenseForm.get('type')?.disable();
  }

  ngOnInit(){
    if (this.data) {
      this.type = this.data.type;
      this.expenseForm.get('type')?.setValue(this.data.type);
      this.expenseForm.get('amount')?.setValue(this.data.amount);
      this.expenseForm.get('title')?.setValue(this.data.title);
      this.expenseForm.get('note')?.setValue(this.data.note);
    }

    if (this.data) {
      this.initialAmount = this.data.amount;
    }
  }

  public updateType(type: string): void {
    this.type = type;
    this.expenseForm.get('type')?.setValue(type);
    this.expenseForm.updateValueAndValidity();
  }

  public handleControlNumberValue(): void {
    const amountControl = this.expenseForm.get('amount');
    if (amountControl) {
      let amountValue = amountControl.value;
  
      // Remove commas before checking for a decimal point
      const amountWithoutCommas = amountValue.replace(/,/g, '');
  
      // Check if value does not contain a decimal point
      if (amountWithoutCommas && amountWithoutCommas.indexOf('.') === -1) {
        // Format the value to add commas for thousands
        amountValue = amountWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        // Append .00 if there is no decimal point
        amountValue += '.00';
  
        // Update the form control value
        amountControl.setValue(amountValue);
      } else {
        // If a decimal point is present, format the value with commas for thousands
        amountValue = amountWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Update the form control value
        amountControl.setValue(amountValue);
      }
    }
  }

  public onSubmit(): void {
    const amountControl = this.expenseForm.get('amount')?.value;
    const typeControl = this.expenseForm.get('type')?.value;
    const controlInfo = {
      amount: amountControl,
      type: typeControl,
      oldAmount: null
    }
    this.handleControlNumberValue();
    if (!this.data) {
      this.expenseService.addExpense(this.expenseForm.getRawValue());
      this.dialogRef.close(controlInfo)
    } else {
      controlInfo.oldAmount = this.initialAmount;
      this.expenseService.updateExpense(this.data.key, this.expenseForm.getRawValue());
      this.dialogRef.close(controlInfo)
    }
  }
}