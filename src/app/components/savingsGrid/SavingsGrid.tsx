// src/components/SavingsGrid/SavingsGrid.tsx
import React from "react";
import styles from "./SavingsGrid.module.css";

const fakeSavings = [
  {
    _id: "saving1",
    goalName: "Trip to Japan",
    targetAmount: 5000,
    currentAmount: 2000,
    deadline: new Date("2024-12-31"),
  },
  {
    _id: "saving2",
    goalName: "Buy a Car",
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
      {fakeSavings.map((saving) => (
        <div key={saving._id} className={styles.gridItem}>
          <h2>{saving.goalName}</h2>
          <p>
            Target: ${saving.targetAmount.toFixed(2)} <br />
            Current: ${saving.currentAmount.toFixed(2)} <br />
            Deadline: {new Date(saving.deadline).toLocaleDateString()}
          </p>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{
                width: `${(saving.currentAmount / saving.targetAmount) * 100}%`,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SavingsGrid;
