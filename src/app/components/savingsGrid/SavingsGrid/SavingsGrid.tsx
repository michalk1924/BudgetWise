// src/components/SavingsGrid/SavingsGrid.tsx
import React from "react";
import styles from "./SavingsGrid.module.css";
import SavingsGridItem from "../SavingsGridItem/SavingsGridItem";

const fakeSavings = [
  {
    _id: "saving1",
    goalName: "Trip to Japan",
    targetAmount: 5000,
    currentAmount: 2000,
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

const SavingsGrid = () => {
  return (
    <div className={styles.gridContainer}>
      {fakeSavings.map((saving,index) => (
         <SavingsGridItem key={index} saving={saving} />
      ))}
    </div>
  );
};

export default SavingsGrid;
