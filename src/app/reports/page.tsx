"use client"
import {DoughnutChart, IncomeExpenseBarChart, SavingsBarChart} from '../components/index';
import useUserStore from "@/store/userStore";
import { ExpenseComparisonChart } from "../components/index";
import fetchDataAndCompare from '@/services/stlouisfedApi';
import { useState, useEffect } from 'react';
import styles from './reports.module.css'


export default function Home() {

    const { user } = useUserStore();

    const [comparisonResults, setComparisonResults] = useState<any[]>([]);

    useEffect(() => {
        const fetchComparisonData = async () => {
            try {
                const data = await fetchDataAndCompare(user);
                setComparisonResults(data ?? []);
            } catch (error) {
                console.error("Failed to fetch comparison results:", error);
            }
        };

        fetchComparisonData();
    }, [user]);

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
            <h2 className={styles.chartTitle}>Category Breakdown</h2>
            <DoughnutChart transactions={user?.transactions ?? []} />
          </div>

          {/* Chart 2 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Income vs Expenses</h2>
            <IncomeExpenseBarChart transactions={user?.transactions ?? []} />
          </div>

          {/* Chart 3 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Savings Overview</h2>
            <SavingsBarChart savings={user?.savings ?? []} />
          </div>

          {/* Chart 4 */}
          <div className={styles.gridItem}>
            <h2 className={styles.chartTitle}>Expense Comparison</h2>
            <ExpenseComparisonChart comparisonResults={comparisonResults} />
          </div>
        </div>
      </main>
    </div>

    );
}