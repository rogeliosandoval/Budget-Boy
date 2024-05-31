export interface User {
  username: string
  email: string
}

export interface Expense {
  key?: string
  type: string
  amount: string
  title: string
  note: string
}