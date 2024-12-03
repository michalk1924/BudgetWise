import React from "react";
import styles from "./budgetGrid.module.css";

const categories = [
  { name: "Groceries", spent: 50, budget: 100 },
  { name: "Transportation", spent: 30, budget: 100 },
  { name: "Entertainment", spent: 70, budget: 150 },
];

const BudgetGrid = () => {
  return (
    <div className={styles.gridContainer}>
      {categories.map((category, index) => {
        const percentage = (category.spent / category.budget) * 100;
        return (
          <div className={styles.gridItem} key={index}>
            <div className={styles.categoryName}>{category.name}</div>
            <div className={styles.details}>
              <div className={styles.details}>
                <span className={styles.spent}>${category.spent} spent</span>
                <span className={styles.left}>${category.budget - category.spent} left</span>
              </div>

            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className={styles.budget}>
              <span>budget: {category.budget} </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BudgetGrid;
