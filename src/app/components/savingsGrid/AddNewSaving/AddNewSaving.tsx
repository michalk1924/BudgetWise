import React from "react";
import styles from "./AddNewSaving.module.css";


const AddNewSaving: React.FC = () =>{
  return (
    <div className={styles.addSavingContainer}>
    <h3 className={styles.addSavingTitle}>Start Saving For:</h3>
    <div className={styles.form}>
      <input type="text" placeholder="Goal Name" className={styles.input} />
      <input type="number" placeholder="Goal Amount" className={styles.input} />
      <input type="number" placeholder="Current Amount" className={styles.input} />
    </div>
  </div>
  );
};

export default AddNewSaving;


