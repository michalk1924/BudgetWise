"use client"
import useUserStore from '@/store/userStore';
import { DoughnutChart, IncomeExpenseBarChart, SavingsBarChart, ExpenseComparisonChart, UserTrendChart, PopularCategoriesComp } from '../components/index';
import styles from './reports.module.css'


export default function Home() {

  const { user } = useUserStore();

  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <h1>Welcome to Your Financial Dashboard</h1>
        <p>Track your spending, savings, and financial goals at a glance.</p>
      </section>

      <main className={styles.main}>
        <div className={styles.gridContainer}>
          {/* Chart 1 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Monthly Expenses Breakdown</h2>
            <DoughnutChart transactions={user?.transactions ?? []} />
          </div>

          {/* Chart 2 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Incomes vs Expenses</h2>
            <IncomeExpenseBarChart transactions={user?.transactions ?? []} />
          </div>

          {/* Chart 3 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Daily Savings Goal Planning</h2>
            <SavingsBarChart savings={user?.savings ?? []} />
          </div>

          {/* Chart 4 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Expense Comparison</h2>
            <ExpenseComparisonChart />
          </div>

          {/* Chart 5 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>User Trends</h2>
            <UserTrendChart transactions={user?.transactions ?? []} />
          </div>

          {/* Chart 6 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Popular Categories</h2>
            <PopularCategoriesComp />
          </div>

        </div>
      </main>
    </div>

  );
}