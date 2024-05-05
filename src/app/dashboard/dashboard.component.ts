import { Component, OnInit, inject } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { ExpenseFormComponent } from "../dialogs/expense-form/expense-form.component";
import { MatDialog } from "@angular/material/dialog";
import { ExpenseService } from "src/app/services/expense.service";
import { Expense } from "../user.interface";

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public sharedService = inject(SharedService);
  private matDialog = inject(MatDialog);
  private expenseService = inject(ExpenseService);
  public expenses: Expense[] = [];
  public totalExpenses = 0;

  ngOnInit(){
    this.getAllExpenses();
  }

  public addExpense(): void {
    const dialogRef = this.matDialog.open(ExpenseFormComponent, {
      data: {

      }
    });
  }

  public getAllExpenses(): void {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = [];

        data.forEach((item) => {
          let expense = item.payload.toJSON() as Expense;
          this.totalExpenses += parseInt(expense.cost);
          this.expenses.push({
            key: item.key || '',
            user: this.sharedService.user.displayName,
            cost: expense.cost,
            title: expense.title,
            note: expense.note
          })
        })
        console.log(this.expenses);
      }
    })
  }
}