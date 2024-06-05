import { Component, Inject, OnInit, inject } from "@angular/core"
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog"
import { ExpenseService } from "src/app/services/expense.service"

@Component({
  selector: 'funds-form',
  templateUrl: 'funds-form.component.html',
  styleUrls: ['funds-form.component.scss']
})

export class FundsFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder)
  private dialogRef = inject(MatDialogRef<FundsFormComponent>)
  private expenseService = inject(ExpenseService)
  public matDialog = inject(MatDialog)
  public fundsForm: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.fundsForm = this.formBuilder.group({
      amount: ['', Validators.required]
    })
  }

  ngOnInit(){}

  public handleControlNumberValue(): void {
    const amountControl = this.fundsForm.get('amount')
    if (amountControl) {
      let amountValue = amountControl.value
  
      // Remove commas before checking for a decimal point
      const amountWithoutCommas = amountValue.replace(/,/g, '')
  
      // Check if value does not contain a decimal point
      if (amountWithoutCommas && amountWithoutCommas.indexOf('.') === -1) {
        // Format the value to add commas for thousands
        amountValue = amountWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        
        // Append .00 if there is no decimal point
        amountValue += '.00'
  
        // Update the form control value
        amountControl.setValue(amountValue)
      } else {
        // If a decimal point is present, format the value with commas for thousands
        amountValue = amountWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
        // Update the form control value
        amountControl.setValue(amountValue)
      }
    }
  }

  public onSubmit(): void {
    this.handleControlNumberValue()
    const amountControl = this.fundsForm.get('amount')
    const amountValue = parseFloat(amountControl?.value.replace(/,/g, ''))
    this.expenseService.addAvailableFunds(amountValue)
    this.dialogRef.close(amountValue)
  }
}