import React from "react";
import styles from "./categories.module.css";
import BudgetGrid from "../components/categoriesGrid/BudgetGrid/BudgetGrid";
import AddNewBudget from "../components/categoriesGrid/AddNewBudget/AddNewBudget";
const Categories = () => {
  return (
    <div className={styles.page}>
      {/* Title Section */}
      <header className={styles.title}>
        <span>BUDGET SETTING</span>
      </header>

      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          <BudgetGrid />
        </section>

        <section className={styles.addBudgetSection}>
          <AddNewBudget />
        </section>
      </section>
    </div>
  );
};

export default Categories;
