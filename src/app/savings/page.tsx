import React from "react";
import styles from "./savings.module.css";
import { SavingsGrid } from "../components/index";
import AddNewSaving from "../components/savingsGrid/AddNewSaving/AddNewSaving";
import { UserSaving } from "@/types/types";

const fakeSavings :  UserSaving[]=[
    {
      _id: "saving1",
      goalName: "Trip to Japan",
      targetAmount: 5000,
      currentAmount: 5000,
      deadline: new Date("2024-12-31"),
    },
    {
      _id: "savinnnng2",
      goalName: "Buyyy a Car",
      targetAmount: 10000,
      currentAmount: 4000,
      deadline: new Date("2025-06-30"),
    },
    {
      _id: "saving3",
      goalName: "Emergency Fund",
      targetAmount: 3000,
      currentAmount: 1500,
      deadline: new Date("2024-06-30"),
    },
  ];
const Savings = () => {
  return (
    <div className={styles.page}>
      {/* Title Section */}
      <header className={styles.title}>
        <span>Saving For Big Goals</span>
      </header>

      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          <SavingsGrid savings={fakeSavings}/>
        </section>

        <section className={styles.addSavingSection}>
          <AddNewSaving />
        </section> 
      </section>
    </div>
  );
};

export default Savings;
