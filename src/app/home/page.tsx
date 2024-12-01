import styles from './home.module.css';
import BudgetWise from '../BudgetWise.png';
import Image from 'next/image';

export default function Home() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                {/* שימוש ב-<Image> של Next.js */}
                <Image src={BudgetWise} alt="BudgetWise Logo" width={150} height={50} />
                <nav className={styles.nav}>
                    <a href="#">Home</a>
                    <a href="#">Categories</a>
                    <a href="#">Savings</a>
                    <a href="#">Reports</a>
                    <a href="#">About Us</a>
                </nav>
            </header>
            <main className={styles.main}>
                <section className={styles.stats}>
                    <div className={`${styles.statBox} ${styles.statBoxWithImage}`} style={{ backgroundColor: '#47cfcf' }}>
                        <h2>CHA-CHING! MY MONTHLY INCOMES</h2>
                        <p>15,990</p>
                    </div>
                    <div className={styles.statBox} style={{ backgroundColor: '#ff6b6b' }}>
                        <h2>MY MONTHLY EXPENSES</h2>
                        <p>15,990</p>
                    </div>
                    <div className={styles.statBox} style={{ backgroundColor: '#f3c969' }}>
                        <h2>YOU SAVED THIS MONTH</h2>
                        <p>15,990</p>
                    </div>
                </section>
                <section className={styles.greeting}>
                    <h2>Hello Name! Great to have you here!</h2>
                    <p>What would you like to do today?</p>
                </section>
                <section className={styles.actions}>
                    <button>My Reports</button>
                    <button>My Savings State</button>
                    <button>Recommendations</button>
                    <button>My Transactions</button>
                </section>
            </main>
        </div>
    );
}
