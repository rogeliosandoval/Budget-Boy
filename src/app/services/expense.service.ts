import { Injectable, inject } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList } from '@angular/fire/compat/database';
import { SharedService } from './shared.service'
import { Expense } from '../user.interface';

@Injectable({
  providedIn: 'root',
})

export class ExpenseService {
  private databasePath = '/expenses/';
  private database = inject(AngularFireDatabase);
  private sharedService = inject(SharedService);
  public expenseRef: AngularFireList<any>
  private userName = this.sharedService.user.displayName;

  constructor(){
    this.expenseRef = this.database.list(this.databasePath + this.userName);
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