import React from "react";
import styles from "./savings.module.css";
import { SavingsGrid } from "../components/index";
const Savings = () => {
  return (
    <div className={styles.page}>
      {/* Title Section */}
      <header className={styles.title}>
        <span>Saving For Big Goals</span>
      </header>

      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          <SavingsGrid />
        </section>

        
      </section>
    </div>
  );
};

export default Savings;
