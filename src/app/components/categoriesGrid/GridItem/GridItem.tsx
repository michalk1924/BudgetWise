"use client";

import React from "react";
import styles from "./GridItem.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { UserCategory } from "../../../../types/types";

interface GridItemProps {
  category: UserCategory;
  isTotal?: boolean; // Optional, defaults to false
}

const GridItem: React.FC<GridItemProps> = ({ category, isTotal = false }) => {
  const percentage = (category.spent / category.budget) * 100;

  return (
    <div className={isTotal ? styles.gridTotalItem : styles.gridItem}>
      {/* Category Name */}
      <div className={isTotal ? styles.categoryTotalName : styles.categoryName}>
        {category.name}
      </div>

      {/* Spending Details */}
      <div className={styles.details}>
        <span className={styles.spent}>
          <h1 className={styles.numeric}>${category.spent}</h1>
          <span className={styles.text}>spent</span>
        </span>
        <span className={styles.left}>
          <h1 className={styles.numeric}>
            ${category.budget - category.spent}
          </h1>
          <span className={styles.text}>left</span>
        </span>
      </div>

      {/* Progress Bar */}
      <ProgressBar percentage={percentage} />

      {/* Budget Info */}
      <div className={styles.details}>
      <span className={styles.budget}>Budget: <h1 className={styles.numeric}>${category.budget}</h1></span>
        <FontAwesomeIcon icon={faEdit} className={styles.editButton} />
      </div>
    </div>
  );
};

export default GridItem;
