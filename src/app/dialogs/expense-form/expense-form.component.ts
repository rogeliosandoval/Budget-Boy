import { Component, Inject, OnInit, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ExpenseService } from "src/app/services/expense.service";

@Component({
  selector: 'expense-form',
  templateUrl: 'expense-form.component.html',
  styleUrls: ['expense-form.component.scss']
})

export class ExpenseFormComponent implements OnInit {
  private formBuilder = inject(FormBuilder);
  private expenseService = inject(ExpenseService);
  public matDialog = inject(MatDialog);
  public expenseForm: FormGroup;
  public type: string = 'expense';

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
    // console.log(this.data)
  }

  public updateType(type: string): void {
    this.type = type;
    this.expenseForm.get('type')?.patchValue(type);
  }

  public onSubmit(): void {
    console.log(this.expenseForm.value)
    // this.expenseService.addExpense(this.expenseForm.value);
    // this.matDialog.closeAll();
  }
}