"use client";

import styles from './home.module.css';
import useUserStore from '@/store/userStore';
import Alerts from '../components/Alerts/Alerts';
import { Alert } from '../../types/types'

export default function Home() {

    const { user } = useUserStore();

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Calculate sums
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


    const alert1: Alert = {
        _id: '1',
        userId: 'user1',
        type: 'budget',
        triggerCondition: 'You have new notifications',
        isActive: true,
        createdAt: new Date('2024-12-08'),
        updatedAt: new Date('2024-12-08'),
        severityLevel: 'Pay attention',
    };

    const alert2: Alert = {
        _id: '2',
        userId: 'user2',
        type: 'budget',
        triggerCondition: 'You have new notifications',
        isActive: false,
        createdAt: new Date('2024-12-08'),
        updatedAt: new Date('2024-12-08'),
        severityLevel: 'warning',
    };

    const alert3: Alert = {
        _id: '3',
        userId: 'user2',
        type: 'budget',
        triggerCondition: 'You have new notifications',
        isActive: false,
        createdAt: new Date('2024-12-08'),
        updatedAt: new Date('2024-12-08'),
        severityLevel: 'critical',
    };

    const handleMarkAsDone = (alert: Alert) => {
        console.log('Marking as done:', alert);
        //כאן צריך למחוק את ההתרעה 
    };

    const handleDeactivateAlert = (alert: Alert) => {
        console.log(`Alert ${alert._id} deactivated`);
        // const updateAlertStatus = useUserStore((state) => state.updateAlertStatus);
        // updateAlertStatus(alert._id, false); 
    };

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
                <Alerts key={alert1._id} alert={alert1} onMarkAsDone={handleMarkAsDone} onDeactivateAlert={handleDeactivateAlert} />
                <Alerts key={alert2._id} alert={alert2} onMarkAsDone={handleMarkAsDone} onDeactivateAlert={handleDeactivateAlert} />
                <Alerts key={alert3._id} alert={alert3} onMarkAsDone={handleMarkAsDone} onDeactivateAlert={handleDeactivateAlert} />


            </main>
        </div>
    );
}
