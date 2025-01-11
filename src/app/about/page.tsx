"use client"
import Image from 'next/image';
import styles from './AboutUs.module.css';
import { useRouter } from 'next/navigation';

export default function AboutUs() {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login'); 
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Welcome to BudgetWise!</h1>
      </header>
      
      <main className={styles.main}>
        <section className={styles.introduction}>
          <p>
            BudgetWise is a smart personal budgeting app designed to help you control your expenses, track your income,
            <Image src='/transactions.png' alt="brush_stain" width={600} height={600} /> 
            and achieve your financial goals efficiently and intelligently
            <Image src='/savings.png' alt="brush_stain" width={600} height={600} /> 

             With a user-friendly interface, personalized alerts, and engaging statistics, BudgetWise provides the tools you've been looking for to manage your money with confidence.
          </p>
        </section>

        <section className={styles.authButtons}>
          <button onClick={handleLogin} className={styles.button}>Login</button>
          <button onClick={handleSignUp} className={styles.button}>Sign Up</button>
        </section>
      </main>
      
    </div>
  );
}
