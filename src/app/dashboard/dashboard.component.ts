import { Component, OnInit, inject } from "@angular/core"
import { SharedService } from "../services/shared.service"
import { ExpenseFormComponent } from "../dialogs/expense-form/expense-form.component"
import { MatDialog } from "@angular/material/dialog"
import { ExpenseService } from "src/app/services/expense.service"
import { ConfirmComponent } from "../dialogs/confirm/confirm.component"
import { Expense } from "../user.interface"

@Component({
  selector: 'dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  public sharedService = inject(SharedService)
  private matDialog = inject(MatDialog)
  private expenseService = inject(ExpenseService)
  public expenses: Expense[] = []
  public totalExpenses: number = 0
  public totalIncome: number = 0
  public totalProfit: number = 0
  public loading: boolean = true
  public totalLoading: boolean = true

  ngOnInit(){
    this.getAllExpenses()
    setTimeout(() => {
      this.getTotals()
    }, 1000)
  }

  public addExpense(): void {
    this.matDialog.open(ExpenseFormComponent).afterClosed().subscribe({
      next: response => {
        if (response) {
          let amount = response.amount.replace(/,/g, '')
          if (response.type === 'expense') {
            this.totalExpenses += parseFloat(amount)
            this.totalProfit = this.totalIncome - this.totalExpenses
          } else {
            this.totalIncome += parseFloat(amount)
            this.totalProfit = this.totalIncome - this.totalExpenses
          }
        }
      }
    })
  }

  public editExpense(expense: Expense): void {
    this.matDialog.open(ExpenseFormComponent, {
      data: expense
    }).afterClosed().subscribe({
      next: response => {
        if (response) {
          let difference = 0
          if (response.oldType === 'expense') {
            if (response.oldType === response.type) {
              if (response.oldAmount < response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                difference = amount - oldAmount
                this.totalExpenses += parseFloat(difference.toString())
                this.totalProfit = this.totalIncome - this.totalExpenses
              } else if (response.oldAmount > response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                difference = oldAmount - amount
                this.totalExpenses -= parseFloat(difference.toString())
                this.totalProfit = this.totalIncome - this.totalExpenses
              }
            } else {
              if (response.oldAmount <= response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                this.totalExpenses -= parseFloat(oldAmount)
                this.totalIncome += parseFloat(amount)
                this.totalProfit = this.totalIncome - this.totalExpenses
              } else if (response.oldAmount >= response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                this.totalExpenses -= parseFloat(oldAmount)
                this.totalIncome += parseFloat(amount)
                this.totalProfit = this.totalIncome - this.totalExpenses
              }
            }
          } else {
            if (response.oldType === response.type) {
              if (response.oldAmount < response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                difference = amount - oldAmount
                this.totalIncome += parseFloat(difference.toString())
                this.totalProfit = this.totalIncome - this.totalExpenses
              } else if (response.oldAmount > response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                difference = oldAmount - amount
                this.totalIncome -= parseFloat(difference.toString())
                this.totalProfit = this.totalIncome - this.totalExpenses
              }
            } else {
              if (response.oldAmount <= response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                this.totalIncome -= parseFloat(oldAmount)
                this.totalExpenses += parseFloat(amount)
                this.totalProfit = this.totalIncome - this.totalExpenses
              } else if (response.oldAmount >= response.amount) {
                let oldAmount = response.oldAmount.replace(/,/g, '')
                let amount = response.amount.replace(/,/g, '')
                this.totalIncome -= parseFloat(oldAmount)
                this.totalExpenses += parseFloat(amount)
                this.totalProfit = this.totalIncome - this.totalExpenses
              }
            }
          }
        }
      }
    })
  }

  public deleteExpense(key: any, type: string, amount: any): void {
    this.matDialog.open(ConfirmComponent, {
      data: {
        key,
        type,
        reason: 'delete'
      }
    }).afterClosed().subscribe({
      next: response => {
        if (response) {
          this.expenseService.deleteExpense(key)
          let parseAmount = amount.replace(/,/g, '')
          if (type === 'expense') {
            this.totalExpenses -= parseAmount
            this.totalProfit = this.totalIncome - this.totalExpenses
          } else {
            this.totalIncome -= parseAmount
            this.totalProfit = this.totalIncome - this.totalExpenses
          }
        }
      }
    })
  }

  public getAllExpenses(): void {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = []

        data.forEach((item) => {
          let expense = item.payload.toJSON() as Expense
          this.expenses.push({
            key: item.key || '',
            type: expense.type,
            amount: expense.amount,
            title: expense.title,
            note: expense.note,
            checked: expense.checked
          })
        })

        this.loading = false
      }
    })
  }

  public getTotals(): void {
    this.expenses.forEach((item) => {
      let amount = item.amount.replace(/,/g, '')

      if (item.type === 'expense') {
        this.totalExpenses += parseFloat(amount)
      } else {
        this.totalIncome += parseFloat(amount)
      }
    })
    this.totalProfit = this.totalIncome - this.totalExpenses
    this.totalLoading = false
  }
}