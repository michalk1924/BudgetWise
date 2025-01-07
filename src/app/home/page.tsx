"use client";

import React from "react";
import styles from "./home.module.css";
import useUserStore from "@/store/userStore";
import { AlertsList, HomeCard } from "../components/index";
import { FaDollarSign, FaShoppingCart } from "react-icons/fa";
import { BiWallet } from "react-icons/bi";
import Link from "next/link";
import { Transaction } from "../../types/types";

export default function Home() {
  const { user } = useUserStore();
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  function calculateMonthlyAmount(
    transactions: Transaction[],
    transactionType: string,
    currentMonth: number,
    currentYear: number
  ): number {
    return transactions
      .filter(
        (transaction) =>
          transaction.type === transactionType &&
          new Date(transaction.date).getMonth() === currentMonth &&
          new Date(transaction.date).getFullYear() === currentYear
      )
      .reduce((sum, transaction) => sum + (transaction.amount || 0), 0);
  }
  function calculateAvailableAmount(): number {
    if (!user || !user.transactions) {
      return 0; // Default to 0 if user or transactions are undefined
    }

    return user.transactions.reduce((amount, t) => {
      if (t.type === "expense" || t.type === "saved") {
        return amount - Number(t.amount || 0);
      }
      return amount + Number(t.amount || 0);
    }, 0);
  }


  const monthlyExpenses = calculateMonthlyAmount(
    user?.transactions || [],
    "expense",
    currentMonth,
    currentYear
  );

  const monthlySavings = calculateMonthlyAmount(
    user?.transactions || [],
    "saved",
    currentMonth,
    currentYear
  );

  const monthlyIncome = calculateMonthlyAmount(
    user?.transactions || [],
    "income",
    currentMonth,
    currentYear
  );

  const availableAmount = calculateAvailableAmount();


  return (
    <div className={styles.container}>
      <section className={styles.greeting}>
        <h1 className={styles.title}>Hello {user?.username || "Name"}!</h1>
        {user && (
          <div className={styles.totalSection}>
            <div className={styles.total}>
            </div>
          </div>)
        }
        <hr className={styles.separator} />

        <section className={styles.actions}>
          <button> <Link href="/transactions" className={styles.btn}>{"Add Transaction >>"}</Link></button>
          <button><Link href="/savings" className={styles.btn}>{"Set New Savings Goal >>"}</Link></button>
          <button><Link href="/categories" className={styles.btn}>{"Plan Monthly Budget >>"}</Link></button>
        </section>

      </section>

      <main className={styles.main}>
        <div className={styles.statBoxes}>
          <section className={styles.stats}>
            <HomeCard
              icon={FaDollarSign}
              title="Your Available Amount"
              amount={availableAmount}
              hoverColor="#6ac488"
            />
            <HomeCard
              icon={FaShoppingCart}
              title="Your Monthly Income"
              amount={monthlyIncome}
              hoverColor="#6ac488"
            />
            <HomeCard
              icon={BiWallet}
              title="You Saved This Month"
              amount={monthlySavings}
              hoverColor="#6c757d"
            />
            <HomeCard
              icon={FaShoppingCart}
              title="Your Monthly Expenses"
              amount={monthlyExpenses}
              hoverColor="#EF5A6F"
            />
          </section>
        </div>;
        <AlertsList alerts={user?.alerts ?? []} />
      </main>

    </div>
  );
}
