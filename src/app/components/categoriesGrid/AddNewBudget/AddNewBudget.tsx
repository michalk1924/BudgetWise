import React from "react";
import styles from "./AddNewBudget.module.css";


const AddNewBudget: React.FC = () =>{
  return (
    <div className={styles.addBudgetContainer}>
    <h3 className={styles.addBudgetTitle}>Add New Budget:</h3>
    <div className={styles.form}>
      <input type="text" placeholder="Category" className={styles.input} />
      <input type="number" placeholder="Budget" className={styles.input} />
      <input type="number" placeholder="Already Used" className={styles.input} />
    </div>
  </div>
  );
};

export default AddNewBudget;


