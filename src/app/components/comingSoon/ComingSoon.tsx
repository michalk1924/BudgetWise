import styles from './ComingSoon.module.css';

export default function ComingSoon() {
  return (
    <div className={styles.fullPage}>
      <div className={styles.content}>
        <h1 className={styles.title}>Coming Soon</h1>
        <p className={styles.subtitle}>
          We're working hard to bring you <strong>BudgetWise</strong> — your smart personal budget management app.
        </p>
        <p className={styles.description}>
          BudgetWise helps you track your expenses, manage your income, and reach your financial goals with ease.
        </p>
        <p className={styles.footer}>
          Stay tuned for updates! <span className={styles.rocket}>&#xf18b;</span>
        </p>
      </div>
    </div>
  );
}
