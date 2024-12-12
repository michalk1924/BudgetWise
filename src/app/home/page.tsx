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

    const monthlyIncome = user?.transactions
        ?.filter(transaction =>
            transaction.type === "income" &&
            new Date(transaction.date).getMonth() === currentMonth &&
            new Date(transaction.date).getFullYear() === currentYear
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

    const monthlyExpenses = user?.transactions
        ?.filter(transaction =>
            transaction.type === "expense" &&
            new Date(transaction.date).getMonth() === currentMonth &&
            new Date(transaction.date).getFullYear() === currentYear
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

    const monthlySavings = user?.transactions
        ?.filter(transaction =>
            transaction.type === "saved" &&
            new Date(transaction.date).getMonth() === currentMonth &&
            new Date(transaction.date).getFullYear() === currentYear
        )
        .reduce((sum, transaction) => sum + transaction.amount, 0) || 0;

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <section className={styles.stats}>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage7}`}>
                        <h2>CHA-CHING! MY MONTHLY INCOMES</h2>
                        <p className={styles.aaa}>{monthlyIncome}</p>
                    </div>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage8}`}>
                        <h2>MY MONTHLY EXPENSES</h2>
                        <p className={styles.aaa}>{monthlyExpenses}</p>
                    </div>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage9}`}>
                        <h2>YOU SAVED THIS MONTH</h2>
                        <p className={styles.aaa}>{monthlySavings}</p>
                    </div>
                </section>

                <section className={styles.greeting}>
                    <h1>Hello {user?.username || "Name"}! Great to have you here!</h1>
                    <p>What would you like to do today?</p>
                </section>
                <AlertsList
                    alerts={user?.alerts ?? []}
                />
            </main>
        </div>
    );
}
