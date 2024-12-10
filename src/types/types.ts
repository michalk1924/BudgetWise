
export interface Category {
  _id: string;
  name: string; 
  description: string; 
}

export interface UserCategory {
  _id: string;
  userId: string; 
  type: 'general' | 'personal'; 
  name: string;
  description: string; 
  budget: number; 
  spent: number; 
  month: Date;
}

export interface Saving {
  _id: string; 
  userId: string;
  goalName: string; 
  targetAmount: number; 
  currentAmount: number; 
  deadline: Date; 
  createdAt: Date; 
  updatedAt: Date; 
}

export interface UserSaving {
  _id: string; 
  goalName: string; 
  targetAmount: number; 
  currentAmount: number; 
  deadline: Date; 
}


export interface Transaction {
  _id: string; 
  userId: string; 
  category: string; 
  type: 'income' | 'expense' | 'saved';
  amount: number;
  description: string; 
  date: Date; 
  createdAt: Date; 
  updatedAt: Date; 
}


export interface Recommendation {
  _id: string; // מזהה ההמלצה
  userId: string; // מזהה המשתמש שאליו מתייחסת ההמלצה
  category?: string; // אם ההמלצה מתייחסת לקטגוריה מסוימת, כמו הוצאות על אוכל
  type: 'expenseReduction' | 'savings' | 'budgeting' | 'other'; // סוג ההמלצה (הורדת הוצאות, פתיחת חסכון, תכנון תקציב וכו')
  message: string; // תיאור ההמלצה (לדוגמה: "נסו לצמצם הוצאות בתחום המזון")
  suggestionValue?: number; // הערך המומלץ (לדוג' "חסכו 200 ש"ח בחודש הזה בקטגוריית אוכל")
  date: Date; // תאריך יצירת ההמלצה
  status: 'pending' | 'viewed' | 'resolved'; // מצב ההמלצה - אם המשתמש ראה או פתר את ההמלצה
}


export interface Saving {
  _id: string; 
  userId: string;
  goalName: string; 
  targetAmount: number; 
  currentAmount: number; 
  deadline: Date;
  createdAt: Date; 
  updatedAt: Date; 
}

export interface Alert {
  _id: string;
  userId: string;
  type:string;
  triggerCondition: string; 
  isActive: boolean;
  createdAt: Date; 
  updatedAt: Date; 
  severityLevel:'critical' | 'warning' | 'Pay attention';
}


export interface Recommendation {
  _id: string; // מזהה ההמלצה
  userId: string; // מזהה המשתמש שאליו מתייחסת ההמלצה
  category?: string; // אם ההמלצה מתייחסת לקטגוריה מסוימת, כמו הוצאות על אוכל
  type: 'expenseReduction' | 'savings' | 'budgeting' | 'other'; // סוג ההמלצה (הורדת הוצאות, פתיחת חסכון, תכנון תקציב וכו')
  message: string; // תיאור ההמלצה (לדוגמה: "נסו לצמצם הוצאות בתחום המזון")
  suggestionValue?: number;
  date: Date; 
  status: 'pending' | 'viewed' | 'resolved'; 
}


export interface User {
  _id: string; 
  username: string; 
  email: string; 
  passwordHash: string; 
  totalBudget: number;
  totalSpending: number;
  categories: UserCategory[]; 
  savings: UserSaving[]; 
  transactions: Transaction[]; 
  alerts: Alert[]; 
  recommendations: Recommendation[];
}

