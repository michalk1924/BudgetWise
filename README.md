# BudgetWise

**BudgetWise** is a smart personal budget management app designed to help you control expenses, track income, and reach your financial goals efficiently. With a user-friendly interface, personalized alerts, and insightful statistics, BudgetWise provides all the tools you need to manage your finances securely and intelligently.

Whether it's tracking daily expenses, setting monthly budgets, or saving for future goals, BudgetWise is your ultimate financial control solution.

---

## **Live Demo**
- [Check out the project on Vercel](https://budget-wise-gamma.vercel.app/)

---

## **Technologies Used**

### **Backend:**
- **Next.js**: Framework for server-side rendering and API routes.
- **MongoDB**: Database for storing user and financial data.

### **Frontend:**
- **Next.js**: For routing and SSR (Server-Side Rendering).
- **React.js**: Frontend library for building user interfaces.

### **Libraries:**
- **axios**: Library for making HTTP requests.
- **bcrypt**: Library for password encryption.
- **react-query**: Data-fetching and caching.
- **zustand**: State management library.
- **chart.js**: Library for displaying charts and graphs.
- **xlsx**: Library for uploading files.
- **nodemailer** : Use to send email notifications.
  
---

## **System Design Document**
For more details about the system design, including wireframes, component architecture, and database structure, check out the [System Design Document](https://docs.google.com/document/d/1JoPnCn85PsVdiyXQbZnf9Cy9x2vkvi0mI1HoedEHzGo/edit?tab=t.0).

---

## **Features**
- **Expense and Income Tracking**: Easily log and categorize your expenses and income.
- **Personal Savings Goals**: Set and track progress on your financial goals.
- **Personalized Alerts**: Get notified based on your spending behavior.
- **Insightful Reports**: View detailed statistics and reports of your spending and saving habits.
- **User-Friendly Interface**: Intuitive and clean UI for effortless navigation.

---

## **System Overview**
BudgetWise is built to simplify financial management for users, offering robust features and seamless functionality. 

### **Core Modules:**
1. **User Management**:
   - User authentication using encrypted passwords (via **bcrypt**).
   - Password recovery and email notifications using **nodemailer**.

2. **Budget Tracking**:
   - Logging daily, weekly, or monthly expenses and income.
   - Categorization of transactions for better insights.

3. **Analytics and Reports**:
   - Generate visual reports and graphs using **chart.js**.
   - Real-time data updates and state management with **zustand** and **react-query**.

4. **Data Storage and Integration**:
   - Data stored in **MongoDB** with API integration using **axios**.

---

## **Team**
- [**Racheli Venderolada**](https://github.com/RacheliVa)
- [**Michal Kastner**](https://github.com/michalk1924)
- [**Yael Kopel**](https://github.com/YaelKoppel)

---

## **Contributing**
Thank you for your interest in BudgetWise! Contributions, suggestions, or ideas for improvement are welcome. Please feel free to open Issues or submit Pull Requests.

---

## **Setup**

### **Development Setup**
   ```bash
   git clone https://github.com/michalk1924/BudgetWise.git
   npm install
   npm run dev
