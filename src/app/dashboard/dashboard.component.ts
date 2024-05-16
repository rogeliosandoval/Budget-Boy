import { Component, OnInit, inject } from "@angular/core";
import { SharedService } from "../services/shared.service";
import { ExpenseFormComponent } from "../dialogs/expense-form/expense-form.component";
import { MatDialog } from "@angular/material/dialog";
import { ExpenseService } from "src/app/services/expense.service";
import { ConfirmComponent } from "../dialogs/confirm/confirm.component";
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
  public totalExpenses: number = 0;
  public totalIncome: number = 0;
  public totalProfit: number = 0;
  public loading: boolean = true;
  public totalLoading: boolean = true;

  ngOnInit(){
    this.getAllExpenses();
    setTimeout(() => {
      this.getTotals();
    }, 1000)
  }

  public addExpense(): void {
    this.sharedService.modalOpened = true;
    setTimeout(() => {
      this.matDialog.open(ExpenseFormComponent).afterClosed().subscribe({
        next: response => {
          if (response) {
            this.sharedService.modalOpened = false;
            if (response.type === 'expense') {
              this.totalExpenses += parseFloat(response.amount);
              this.totalProfit = this.totalIncome - this.totalExpenses;
            } else {
              this.totalIncome += parseFloat(response.amount);
              this.totalProfit = this.totalIncome - this.totalExpenses;
            }
          }
        }
      });
    }, 20)
  }

  public editExpense(expense: Expense): void {
    this.sharedService.modalOpened = true;
    setTimeout(() => {
      this.matDialog.open(ExpenseFormComponent, {
        data: expense
      }).afterClosed().subscribe({
        next: response => {
          if (response) {
            this.sharedService.modalOpened = false;
            let difference = 0;
            if (response.type === 'expense') {
              if (response.oldAmount < response.amount) {
                difference = response.amount - response.oldAmount;
                this.totalExpenses += parseFloat(difference.toString());
                this.totalProfit = this.totalIncome - this.totalExpenses;
              } else if (response.oldAmount > response.amount) {
                difference = response.oldAmount - response.amount;
                this.totalExpenses -= parseFloat(difference.toString());
                this.totalProfit = this.totalIncome - this.totalExpenses;
              }
            } else {
              if (response.oldAmount < response.amount) {
                difference = response.amount - response.oldAmount;
                this.totalIncome += parseFloat(difference.toString());
                this.totalProfit = this.totalIncome - this.totalExpenses;
              } else if (response.oldAmount > response.amount) {
                difference = response.oldAmount - response.amount;
                this.totalIncome -= parseFloat(difference.toString());
                this.totalProfit = this.totalIncome - this.totalExpenses;
              }
            }
          }
        }
      })
    }, 20)
  }

  public deleteExpense(key: any, type: string, amount: any): void {
    this.sharedService.modalOpened = true;
    setTimeout(() => {
      this.matDialog.open(ConfirmComponent, {
        data: {
          key,
          type
        }
      }).afterClosed().subscribe({
        next: response => {
          this.sharedService.modalOpened = false;
          if (response) {
            if (type === 'expense') {
              this.totalExpenses -= amount
              this.totalProfit = this.totalIncome - this.totalExpenses;
            } else {
              this.totalIncome -= amount
              this.totalProfit = this.totalIncome - this.totalExpenses;
            }
          }
        }
      })
    }, 20)
  }

  public getAllExpenses(): void {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = [];

        data.forEach((item) => {
          let expense = item.payload.toJSON() as Expense;
          this.expenses.push({
            key: item.key || '',
            type: expense.type,
            amount: expense.amount,
            title: expense.title,
            note: expense.note
          })
        })

        this.loading = false;
      }
    })
  }

  public getTotals(): void {
    this.expenses.forEach((item) => {
      if (item.type === 'expense') {
        this.totalExpenses += parseFloat(item.amount);
      } else {
        this.totalIncome += parseFloat(item.amount);
      }
    })
    this.totalProfit = this.totalIncome - this.totalExpenses;
    this.totalLoading = false;
  }
}