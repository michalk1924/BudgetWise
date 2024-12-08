"use client"

import styles from './AboutUs.module.css';
import { useRouter } from 'next/navigation'; // Import from next/navigation instead of next/router

export default function AboutUs() {
  const router = useRouter(); // Use the router for navigation

  const handleLogin = () => {
    router.push('/login'); // Redirect to the login page
  };

  const handleSignUp = () => {
    router.push('/sign-up'); // Redirect to the sign-up page
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>About Us</h1>
      </header>
      
      <main className={styles.main}>
        <section className={styles.introduction}>
          <h2>Welcome to BudgetWise</h2>
          <p>
            BudgetWise is a smart personal budgeting app designed to help you control your expenses, track your income, and achieve your financial goals efficiently and intelligently. With a user-friendly interface, personalized alerts, and engaging statistics, BudgetWise provides the tools you've been looking for to manage your money with confidence.
          </p>
        </section>

        {/* Buttons for Login and Sign Up */}
        <section className={styles.authButtons}>
          <button onClick={handleLogin} className={styles.button}>Login</button>
          <button onClick={handleSignUp} className={styles.button}>Sign Up</button>
        </section>
      </main>
      
    </div>
  );
}
