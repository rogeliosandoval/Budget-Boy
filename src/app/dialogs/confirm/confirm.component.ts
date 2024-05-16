import { Component, Inject, inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import { ExpenseService } from "src/app/services/expense.service";

@Component({
  selector: 'confirm',
  templateUrl: 'confirm.component.html',
  styleUrls: ['confirm.component.scss']
})

export class ConfirmComponent {
  public matDialog = inject(MatDialog);
  public expenseService = inject(ExpenseService);
  public type: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.type = data.type;
  }

  public deleteExpense(): void {
    this.expenseService.deleteExpense(this.data.key);
    this.matDialog.closeAll();
  }
}