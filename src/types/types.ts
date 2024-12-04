// types.ts

/**
 * Interface representing a Category object.
 * A category can be either an income or expense, and it includes information about the user's budget for that category.
 */
export interface Category {
  _id: string;
  name: string; // The name of the category (e.g., "Food", "Salary")
  description: string; // The description of the category
}

/**
* Interface representing a Category object.
* A category can be either an income or expense, and it includes information about the user's budget for that category.
*/
export interface UserCategory {
    _id: string; 
    userId: string; // User identifier
    type: 'general' | 'personal'; // The type of category
    name: string; // The name of the category (e.g., "Food", "Salary")
    description: string; // The description of the category
    budget: number; // The budget limit for this category (optional)
    spent: number; // The amount spent
    month: Date;
  }
  
  /**
   * Interface representing a Saving object.
   * A saving is a financial goal where a user saves money towards a specific target.
   */
  export interface Saving {
    _id: string; // Saving identifier
    userId: string; // User identifier
    goalName: string; // The name of the savings goal (e.g., "Trip to Japan")
    targetAmount: number; // The target amount the user wants to save
    currentAmount: number; // The current amount the user has saved so far
    deadline: Date; // Deadline for reaching the savings goal
    createdAt: Date; // Date when the saving goal was created
    updatedAt: Date; // Date when the saving goal was last updated
  }
  export interface UserSaving {
    _id: string; // Saving identifier
    goalName: string; // The name of the savings goal (e.g., "Trip to Japan")
    targetAmount: number; // The target amount the user wants to save
    currentAmount: number; // The current amount the user has saved so far
    deadline: Date; // Deadline for reaching the savings goal
  }
  
  /**
   * Interface representing a Transaction object.
   * A transaction can be either an income or an expense, and includes details about the amount, description, and category.
   */
  export interface Transaction {
    _id: string; // Transaction identifier
    userId: string; // User identifier
    category: string; // Category identifier associated with this transaction
    type: 'income' | 'expense'; // Type of transaction (either "income" or "expense")
    amount: number; // The amount of money for this transaction
    description: string; // A description of the transaction (e.g., "Supermarket shopping")
    date: Date; // Date when the transaction occurred
    createdAt: Date; // Date when the transaction was created
    updatedAt: Date; // Date when the transaction was last updated
  }
  
  /**
   * Interface representing an Alert object.
   * An alert informs the user about specific conditions, such as exceeding the budget or reaching a savings goal.
   */
  export interface Alert {
    _id: string; // Alert identifier
    userId: string; // User identifier
    type: string; // Type of alert (e.g., "budgetExceeded", "savingGoal")
    triggerCondition: string; // Condition that triggers the alert (e.g., "budget > 90%")
    isActive: boolean; // Whether the alert is currently active
    createdAt: Date; // Date when the alert was created
    updatedAt: Date; // Date when the alert was last updated
  }

   /**
   * Interface representing an Recommendation object.
   * An alert informs the user about specific conditions, such as exceeding the budget or reaching a savings goal.
   */
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
  
  
  /**
   * Interface representing a User object.
   * A user has information like username, email, password (hashed), currency, and associated categories, savings, transactions, and alerts.
   */
  export interface User {
    _id: string; // User identifier
    username: string; // The username of the user
    email: string; // The user's email address
    passwordHash: string; // The hashed password (not used on the client side for security reasons)
   totalBudget: number; // Total
   totalSpending: number; 
    categories: UserCategory[]; // Array of categories associated with the user
    savings: UserSaving[]; // Array of savings goals associated with the user
    transactions: Transaction[]; // Array of transactions associated with the user
    alerts: Alert[]; // Array of alerts associated with the user
    recommendations:Recommendation[];
  }
  


/**
 * Interface representing a Saving object.
 * A saving is a financial goal where a user saves money towards a specific target.
 */
export interface Saving {
  _id: string; // Saving identifier
  userId: string; // User identifier
  goalName: string; // The name of the savings goal (e.g., "Trip to Japan")
  targetAmount: number; // The target amount the user wants to save
  currentAmount: number; // The current amount the user has saved so far
  deadline: Date; // Deadline for reaching the savings goal
  createdAt: Date; // Date when the saving goal was created
  updatedAt: Date; // Date when the saving goal was last updated
}

/**
 * Interface representing a Transaction object.
 * A transaction can be either an income or an expense, and includes details about the amount, description, and category.
 */
export interface Transaction {
  _id: string; // Transaction identifier
  userId: string; // User identifier
  category: string; // Category identifier associated with this transaction
  type: 'income' | 'expense'; // Type of transaction (either "income" or "expense")
  amount: number; // The amount of money for this transaction
  description: string; // A description of the transaction (e.g., "Supermarket shopping")
  date: Date; // Date when the transaction occurred
  createdAt: Date; // Date when the transaction was created
  updatedAt: Date; // Date when the transaction was last updated
}

/**
 * Interface representing an Alert object.
 * An alert informs the user about specific conditions, such as exceeding the budget or reaching a savings goal.
 */
export interface Alert {
  _id: string; // Alert identifier
  userId: string; // User identifier
  type: string; // Type of alert (e.g., "budgetExceeded", "savingGoal")
  triggerCondition: string; // Condition that triggers the alert (e.g., "budget > 90%")
  isActive: boolean; // Whether the alert is currently active
  createdAt: Date; // Date when the alert was created
  updatedAt: Date; // Date when the alert was last updated
}

/**
* Interface representing an Recommendation object.
* An alert informs the user about specific conditions, such as exceeding the budget or reaching a savings goal.
*/
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


/**
 * Interface representing a User object.
 * A user has information like username, email, password (hashed), currency, and associated categories, savings, transactions, and alerts.
 */
export interface User {
  _id: string; // User identifier
  username: string; // The username of the user
  email: string; // The user's email address
  passwordHash: string; // The hashed password (not used on the client side for security reasons)
  totalBudget: number; // Total
  totalSpending: number;
  categories: UserCategory[]; // Array of categories associated with the user
  savings: Saving[]; // Array of savings goals associated with the user
  transactions: Transaction[]; // Array of transactions associated with the user
  alerts: Alert[]; // Array of alerts associated with the user
  recommendations: Recommendation[];
}
