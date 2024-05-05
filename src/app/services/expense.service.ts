import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { Expense } from '../user.interface';

@Injectable({
  providedIn: 'root',
})

export class ExpenseService {
  private databasePath = '/expenses';
  private database = inject(AngularFireDatabase);
  public expenseRef: AngularFireList<any>

  constructor() {
    this.expenseRef = this.database.list(this.databasePath);
  }

  getAllExpenses() {
    return this.expenseRef;
  }

  addExpense(expense: Expense): void {
    this.expenseRef.push(expense);
  }

  getExpense(key: string) {
    return this.database.object(`${this.databasePath}/${key}`);
  }

  updateExpense(key: string, expense: Expense): void {
    this.expenseRef.update(key, expense);
  }

  deleteExpense(key: string) {
    return this.expenseRef.remove(key);
  }
}