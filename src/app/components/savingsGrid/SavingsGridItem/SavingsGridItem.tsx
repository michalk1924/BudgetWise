"use client";

import React from "react";
import styles from "./SavingsGridItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserSaving } from "../../../../types/types";
import ProgressBar from "./ProgressBar/ProgressBar";
interface SavingGridItemProps {
  saving: UserSaving;
}

const SavingsGridItem: React.FC<SavingGridItemProps> = ({ saving }) => {
  const percentage = (saving.currentAmount / saving.targetAmount) * 100;

  return (
    <div key={saving._id} className={styles.gridItem}>
      <h2>{saving.goalName}</h2>
      <div className={styles.details}>

      <span className={styles.current}>
          Current: ${saving.currentAmount.toFixed(2)}
        </span>
      <span className={styles.target}>
        Target: ${saving.targetAmount.toFixed(2)}
      </span>
      </div>

      <div className={styles.progressBar}>
          <ProgressBar percentage={percentage}/>
        </div>
        
        <span className={styles.deadline}>
          Deadline: {new Date(saving.deadline).toLocaleDateString()}
        </span>
      
    </div>
  );
};

export default SavingsGridItem;
