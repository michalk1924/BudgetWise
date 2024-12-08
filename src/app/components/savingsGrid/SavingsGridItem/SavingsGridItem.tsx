"use client";

import React from "react";
import styles from "./SavingsGridItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserSaving } from "../../../../types/types";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
interface SavingGridItemProps {
  saving: UserSaving;
}

const SavingsGridItem: React.FC<SavingGridItemProps> = ({ saving }) => {
    const percentage = (saving.currentAmount / saving.targetAmount) * 100;

    return (
      <div key={saving._id} className={styles.gridItem}>
        <h2 className={styles.goalName}>{saving.goalName}</h2>
        <ProgressCircle
          percentage={percentage}
          current={saving.currentAmount}
          target={saving.targetAmount}
        />
        <span className={styles.deadline}>
          Deadline: {new Date(saving.deadline).toLocaleDateString()}
        </span>
      </div>
    );
};

export default SavingsGridItem;
