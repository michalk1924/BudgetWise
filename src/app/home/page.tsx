"use client";

import React from "react";
import styles from "./home.module.css";
import useUserStore from "@/store/userStore";
import { AlertsList } from "../components/index";
import {FaWallet , FaShoppingCart, FaDollarSign } from "react-icons/fa";
import {MdOutlineSavings} from "react-icons/md";
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
        {user && (
            <div className={styles.totalSection}>
              <div className={styles.total}>
                <h3>Your Available Amount is: </h3>
                <p>
                  {user?.transactions
                    ?.reduce((amount, t) => {
                      if (t.type === "expense"||t.type === "saved") {
                        return amount - Number(t.amount || 0);
                      }
                      return amount + Number(t.amount || 0);
                    }, 0)
                    .toFixed(2)}$
                </p>
                </div>
                </div>)
                }
        <hr className={styles.separator} />

{/*         <h2>What would you like to do today?</h2>
 */}        <section className={styles.actions}>
       <button> <Link href="/transactions" className={styles.btn}>{"Add Transaction >>"}</Link></button>
        <button><Link href="/savings" className={styles.btn}>{"Set New Savings Goal >>"}</Link></button>
        <button><Link href="/categories" className={styles.btn}>{"Plan Monthly Budget >>"}</Link></button>
        </section>

      </section>

      <main className={styles.main}>
        <div className={styles.statBoxes}>
        <section className={styles.stats}>
            <div className={styles.monthlyIncome}>
              <FaDollarSign className={styles.icon} />
              <h2>Your Monthly Income</h2>
              <p className={styles.text}>${monthlyIncome.toFixed(2)}</p>
            </div>

            <div className={styles.monthlySavings}>
              <FaWallet className={styles.icon} />
              <h2>You Saved This Month</h2>
              <p className={styles.text}>${monthlySavings.toFixed(2)}</p>
            </div>

            <div className={styles.monthlyExpenses}>
              <FaShoppingCart className={styles.icon} />
              <h2>Your Monthly Expenses</h2>
              <p className={styles.text}>${monthlyExpenses.toFixed(2)}</p>
            </div>
          
        </section>

        
        </div>
        <AlertsList  alerts={user?.alerts ?? []} />
      </main>
     
    </div>
  );
}
