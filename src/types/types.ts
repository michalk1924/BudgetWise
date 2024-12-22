

export interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  totalBudget: number;
  totalSpending: number;
  balance: number;
  financialStartDay:number
  categories: Category[]; 
  savings: Saving[];
  transactions: Transaction[];
  alerts: Alert[];
  recommendations: Recommendation[];
}

export interface Category {
  _id: string;
  name: string;
  description: string;
  monthlyBudget: number;
  month: Date;
}

export interface Saving {
  _id: string;
  goalName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}


export interface Transaction {
  _id: string;
  category?: Category;
  type: 'income' | 'expense' | 'saved';
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: "cash" | "credit" | "check" | "bank_transfer" | "bit" | "other";
}


export interface Recommendation {
  _id: string;
  userId: string;
  category?: string;
  type: 'expenseReduction' | 'savings' | 'budgeting' | 'other';
  message: string;
  suggestionValue?: number;
  date: Date;
  status: 'pending' | 'viewed' | 'resolved';
}

export interface Alert {
  alertId: string;
  type:string;
  triggerCondition: string; 
  isActive: boolean;
  createdAt: Date; 
  updatedAt: Date; 
  severityLevel:'critical' | 'warning' | 'Pay attention';
  solutions :Solution[];
}

export interface Solution {
  id: string;
  description: string;
  actionLink?: string;
  isRecommended?: boolean;
}

export interface CategoriesCollection {
  _id: string;
  name: string;
  description: string;
}

export interface SavingsCollection {
  _id: string;
  goalName: string;
}

