"use client";

import React from "react";
import styles from "./home.module.css";
import useUserStore from "@/store/userStore";
import { AlertsList } from "../components/index";
import { FaPiggyBank, FaShoppingCart, FaDollarSign } from "react-icons/fa";

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
        <h1>Hello {user?.username || "Name"}!</h1>
        <h2>What would you like to do today?</h2>
        <section className={styles.actions}>
          <button>Add Transaction</button>
          <button>Set New Savings Goal</button>
          <button>Plan Monthly Budget</button>
        </section>

        <section className={styles.greeting}>
        </section>
      </section>

      <main className={styles.main}>
        <div className={styles.statBoxes}>
        <section className={styles.stats}>
          <div className={styles.statBox}>
            <div className={styles.monthlyIncome}>
              <FaDollarSign className={styles.icon} />
              <h2>Your Monthly Income</h2>
              <p className={styles.aaa}>${monthlyIncome.toFixed(2)}</p>
            </div>
          </div>

          <div className={styles.statBox}>
            <div className={styles.monthlySavings}>
              <FaPiggyBank className={styles.icon} />
              <h2>You Saved This Month</h2>
              <p className={styles.aaa}>${monthlySavings.toFixed(2)}</p>
            </div>
          </div>

          <div className={styles.statBox}>
            <div className={styles.monthlyExpenses}>
              <FaShoppingCart className={styles.icon} />
              <h2>Your Monthly Expenses</h2>
              <p className={styles.aaa}>${monthlyExpenses.toFixed(2)}</p>
            </div>
          </div>
        </section>

        
        </div>
        <AlertsList  alerts={user?.alerts ?? []} />
      </main>
     
    </div>
  );
}
