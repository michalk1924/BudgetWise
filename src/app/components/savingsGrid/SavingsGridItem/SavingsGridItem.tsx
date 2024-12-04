"use client";

import React from "react";
import styles from "./SavingsGridItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserSaving } from "../../../../types/types";

interface SavingGridItemProps {
  saving: UserSaving;
}

const SavingsGridItem: React.FC<SavingGridItemProps> = ({ saving }) => {
  const percentage = (saving.currentAmount / saving.targetAmount) * 100;

  return (
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
  );
};

export default SavingsGridItem;
