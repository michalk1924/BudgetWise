"use client";

import React from "react";
import styles from "./home.module.css";
import useUserStore from "@/store/userStore";
import { AlertsList } from "../components/index";
import { FaPiggyBank, FaShoppingCart, FaDollarSign } from "react-icons/fa";
import Link from "next/link";
export default function Home() {
  const { user, updateAlertStatus } = useUserStore();

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const monthlyIncome = Number(
    user?.transactions
      ?.filter(
        (transaction) =>
          transaction.type === "income" &&
          new Date(transaction.date).getMonth() === currentMonth &&
          new Date(transaction.date).getFullYear() === currentYear
      )
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0
  );

  const monthlyExpenses = Number(
    user?.transactions
      ?.filter(
        (transaction) =>
          transaction.type === "expense" &&
          new Date(transaction.date).getMonth() === currentMonth &&
          new Date(transaction.date).getFullYear() === currentYear
      )
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0
  );

  const monthlySavings = Number(
    user?.transactions
      ?.filter(
        (transaction) =>
          transaction.type === "saved" &&
          new Date(transaction.date).getMonth() === currentMonth &&
          new Date(transaction.date).getFullYear() === currentYear
      )
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0
  );

  return (
    <div className={styles.container}>
      <section className={styles.greeting}>
        <h1 className={styles.title}>Hello {user?.username || "Name"}!</h1>
        <hr className={styles.separator} />

        <h2>What would you like to do today?</h2>
        <section className={styles.actions}>
       <button> <Link href="/transactions" className={styles.btn}>Add Transaction</Link></button>
        <button><Link href="/savings" className={styles.btn}>Set New Savings Goal</Link></button>
        <button><Link href="/categories" className={styles.btn}>Plan Monthly Budget</Link></button>
        </section>

      </section>

      <main className={styles.main}>
        <div className={styles.statBoxes}>
        <section className={styles.stats}>
            <div className={styles.monthlyIncome}>
              <FaDollarSign className={styles.icon} />
              <h2>Your Monthly Income</h2>
              <p className={styles.aaa}>${monthlyIncome.toFixed(2)}</p>
            </div>

            <div className={styles.monthlySavings}>
              <FaPiggyBank className={styles.icon} />
              <h2>You Saved This Month</h2>
              <p className={styles.aaa}>${monthlySavings.toFixed(2)}</p>
            </div>

            <div className={styles.monthlyExpenses}>
              <FaShoppingCart className={styles.icon} />
              <h2>Your Monthly Expenses</h2>
              <p className={styles.aaa}>${monthlyExpenses.toFixed(2)}</p>
            </div>
          
        </section>

        
        </div>
        <AlertsList  alerts={user?.alerts ?? []} />
      </main>
     
    </div>
  );
}
