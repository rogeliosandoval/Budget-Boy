import { Component, OnInit, inject } from "@angular/core"
import { Expense } from "../user.interface"
import { ExpenseService } from "../services/expense.service"
import { MatDialog } from "@angular/material/dialog"
import { FundsFormComponent } from "../dialogs/funds-form/funds-form.component"
import { SharedService } from "../services/shared.service"
import { ConfirmComponent } from "../dialogs/confirm/confirm.component"

@Component({
  selector: 'checklist',
  templateUrl: 'checklist.component.html',
  styleUrls: ['checklist.component.scss']
})

export class ChecklistComponent implements OnInit {
  private matDialog = inject(MatDialog)
  public sharedService = inject(SharedService)
  public expenses: Expense[] = []
  public onlyExpenses: Expense[] = []
  public loading: boolean = true
  public fundsAvailable: any
  public fundsLoading: boolean = true
  private expenseService = inject(ExpenseService)

  ngOnInit() {
    this.getAllExpenses()
    this.expenseService.getAvailableFunds().subscribe(funds => {
      this.fundsAvailable = funds
      this.fundsLoading = false
    })
  }

  public getAllExpenses(): void {
    this.expenseService.getAllExpenses().snapshotChanges().subscribe({
      next: (data) => {
        this.expenses = []

        data.forEach((item) => {
          let expense = item.payload.toJSON() as Expense
          if (expense.type === 'expense') {
            this.expenses.push({
              key: item.key || '',
              type: expense.type,
              amount: expense.amount,
              title: expense.title,
              note: expense.note,
              checked: expense.checked
            })
          }
        })

        this.loading = false
      }
    })
  }

  public addFunds(): void {
    this.matDialog.open(FundsFormComponent).afterClosed().subscribe({
      next: response => {
        if (response) {

        }
      }
    })
  }

  public unmarkExpenses(): void {
    this.matDialog.open(ConfirmComponent, {
      data: {
        reason: 'unmark'
      }
    }).afterClosed().subscribe({
      next: response => {
        if (response) {
          this.loading = true
          setTimeout(() => {
            this.expenseService.updateAllExpenseChecked(false)
            window.location.reload()
          }, 1000)
        }
      }
    })
  }

  public checkExpense(amount: any, key: any, checked: boolean): void {
    const amountControl = amount
    const amountValue = parseFloat(amountControl.replace(/,/g, ''))
    if (checked === false) {
      this.expenseService.addAvailableFunds(this.fundsAvailable = parseFloat(this.fundsAvailable) - amountValue)
      this.expenseService.updateExpenseChecked(key, true)
    } else {
      this.expenseService.addAvailableFunds(this.fundsAvailable = parseFloat(this.fundsAvailable) + amountValue)
      this.expenseService.updateExpenseChecked(key, false)
    }
  }
}