import { Injectable, inject } from '@angular/core'
import { AngularFireDatabase } from '@angular/fire/compat/database'
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database'
import { SharedService } from './shared.service'
import { Expense } from '../user.interface'

@Injectable({
  providedIn: 'root',
})

export class ExpenseService {
  private databaseExpensePath = '/expenses/'
  private databaseFundsPath = '/funds/'
  private database = inject(AngularFireDatabase)
  private sharedService = inject(SharedService)
  public expenseRef: AngularFireList<any>
  public fundsRef: AngularFireObject<any>
  private userName = this.sharedService.user.displayName
  public funds = 'Funds'

  constructor(){
    this.expenseRef = this.database.list(this.databaseExpensePath + this.userName)
    this.fundsRef = this.database.object(this.databaseFundsPath + this.userName)
  }

  getAllExpenses() {
    return this.expenseRef
  }

  getAvailableFunds() {
    return this.fundsRef.valueChanges();
  }

  addAvailableFunds(amount: any) {
    const formattedAmount = parseFloat(amount)
    this.fundsRef.set(formattedAmount)
  }

  addExpense(expense: Expense): void {
    this.expenseRef.push(expense)
  }
  
  getExpense(key: string) {
    return this.database.object(`${this.databaseExpensePath}/${key}`)
  }

  updateExpense(key: string, expense: Expense): void {
    this.expenseRef.update(key, expense)
  }

  updateExpenseChecked(key: string, checked: boolean): void {
    this.expenseRef.update(key, { checked: checked })
  }

  updateAllExpenseChecked(checked: boolean): void {
    this.expenseRef.snapshotChanges().subscribe(expenses => {
      expenses.forEach(expense => {
        const key = expense.key
        if (key !== null) {
          this.expenseRef.update(key, { checked: checked })
        }
      })
    })
  }

  deleteExpense(key: string) {
    return this.expenseRef.remove(key)
  }
}