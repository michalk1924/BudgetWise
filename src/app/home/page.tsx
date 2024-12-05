"use client"

import styles from './home.module.css';
import { getToken } from '../../services/cookies';
import { useEffect } from 'react';

export default function Home() {

    useEffect(() => {
        const token = getToken();
        console.log(token);
    }, [])

    return (
        <div className={styles.container}>
            <main className={styles.main}>
                <section className={styles.stats}>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage7}`}>
                        <h2>CHA-CHING! MY MONTHLY INCOMES</h2>
                        <p>15,990</p>
                    </div>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage8}`}>
                        <h2>MY MONTHLY EXPENSES</h2>
                        <p>15,990</p>
                    </div>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage9}`}>
                        <h2>YOU SAVED THIS MONTH</h2>
                        <p>15,990</p>
                    </div>
                </section>
                <section className={styles.greeting}>
                    <h1>Hello Name! Great to have you here!</h1>
                    <p>What would you like to do today?</p>
                </section>
                <section className={styles.actions}>
                    <button>My Reports
                        <img src='/10-removebg-preview.png'></img>
                    </button>
                    <button>My Savings State
                        <img src='/11-removebg-preview.png'></img>
                    </button>
                    <button>Recommendations
                        <img src='/12-removebg-preview.png'></img>
                    </button>
                    <button>My Transactions
                        <img src='/13-removebg-preview.png'></img>
                    </button>
                </section>
            </main>
        </div>
    );
}
