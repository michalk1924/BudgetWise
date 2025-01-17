

export interface User {
  _id: string;
  username: string;
  email: string;
  passwordHash: string;
  balance: number;
  financialStartDay: number
  categories: Category[];
  savings: Saving[];
  transactions: Transaction[];
  alerts: Alert[];
  recommendations: Recommendation[];
  fixedExpenses: FixedExpense[];
}

export interface MonthlyBudget {
  _id: string;
  month: Date;
  budget: number;
  spent: number;
}

export interface Category {
  _id: string;
  categoryName: string;
  description: string;
  budget: number;
  spent: number;
  monthlyBudget?: MonthlyBudget[];
}


export interface Transaction {
  _id: string;
  category?: string;
  type: 'income' | 'expense' | 'saved';
  amount: number;
  description: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  paymentMethod?: "cash" | "credit" | "check" | "bank_transfer" | "bit" | "other";
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
  type: string;
  triggerCondition: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  severityLevel: 'critical' | 'warning' | 'Pay attention';
  solutions: Solution[];
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

export interface FixedExpense {
  _id: string;
  name?: string; 
  amount?: number; 
  firstPaymentDate?: Date; 
  totalInstallments?: number; 
  category?: string; 
  paymentMethod?: "cash" | "credit" | "check" | "bank_transfer" | "bit" | "other"; 
  notes?: string; 
  createdAt?: Date; 
  updatedAt?: Date; 
}

export interface MonthlySummary {
  totalExpenses: number,
  totalIncomes: number,
  totalSaved: number,
  monthlyTransactions: Transaction[]
}