import React from 'react';
import styles from './categories.module.css';
import BudgetGrid from "../components/categoriesGrid/BudgetGrid/BudgetGrid";

const Categories = () => {
  return (
    <div className={styles.page}>
      {/* Title Section */}
      <header className={styles.title}>
        <span>BUDGET
          SETTING</span>
      </header>

      <section className={styles.mainSection}>
        {/* Table Section */}
        <section className={styles.tableSection}>
          <BudgetGrid />
          <span className={styles.seeMore}>See More...</span>
        </section>

        {/* Add New Budget Section */}
        <section className={styles.addBudgetSection}>
          <div className={styles.addBudgetContainer}>
            <h3 className={styles.addBudgetTitle}>Add New Budget:</h3>
            <div className={styles.form}>
              <input type="text" placeholder="Category" className={styles.input} />
              <input type="number" placeholder="Budget" className={styles.input} />
              <input type="number" placeholder="Already Used" className={styles.input} />
            </div>
          </div>
        </section>
      </section>
    </div>
  );
};

export default Categories;
