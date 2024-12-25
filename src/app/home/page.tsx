"use client";

import React from "react";
import styles from "./home.module.css";
import useUserStore from "@/store/userStore";
import AlertsList from "../components/AlertsList/AlertsList";

export default function Home() {
    const { user, updateAlertStatus } = useUserStore();

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate monthly income
    const monthlyIncome = Number(
        user?.transactions
            ?.filter(transaction =>
                transaction.type === "income" &&
                new Date(transaction.date).getMonth() === currentMonth &&
                new Date(transaction.date).getFullYear() === currentYear
            )
            .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0
    );

    // Calculate monthly expenses
    const monthlyExpenses = Number(
        user?.transactions
            ?.filter(transaction =>
                transaction.type === "expense" &&
                new Date(transaction.date).getMonth() === currentMonth &&
                new Date(transaction.date).getFullYear() === currentYear
            )
            .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0) || 0
    );

    // Calculate monthly savings
    const monthlySavings = Number(
        user?.transactions
            ?.filter(transaction =>
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
                <h2>Great to have you here!</h2>
            </section>

            <main className={styles.main}>
                <section className={styles.stats}>
                    <div className={styles.statBox}>
                        <div className={styles.monthlyIncome}>
                            <h2>Your Monthly Income</h2>
                            <p className={styles.aaa}>${monthlyIncome.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.monthlyExpenses}>
                            <h2>Your Monthly Expenses</h2>
                            <p className={styles.aaa}>${monthlyExpenses.toFixed(2)}</p>
                        </div>
                    </div>
                    <div className={styles.statBox}>
                        <div className={styles.monthlySavings}>
                            <h2>You Saved This Month</h2>
                            <p className={styles.aaa}>${monthlySavings.toFixed(2)}</p>
                        </div>
                    </div>
                </section>

                <section className={styles.greeting}>
                    <h2>What would you like to do today?</h2>
                </section>
                <AlertsList alerts={user?.alerts ?? []} />
            </main>
        </div>
    );
}
