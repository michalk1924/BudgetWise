import React from "react";
import styles from "./GridItem.module.css";
import ProgressBar from "../ProgressBar/ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { UserCategory } from "../../../../types/types";

interface GridItemProps {
  category: UserCategory;
}
const GridItem: React.FC<GridItemProps> = ({ category })=> {
  const percentage = (category.spent / category.budget) * 100;

  return (
    <div className={styles.gridItem}>
      {/* Category Name */}
      <div className={styles.categoryName}>{category.name}</div>

      {/* Spending Details */}
      <div className={styles.details}>
        <span className={styles.spent}>${category.spent} spent</span>
        <span className={styles.left}>${category.budget - category.spent} left</span>
      </div>

      {/* Progress Bar */}
      <ProgressBar percentage={percentage} />

      {/* Budget Info */}
      <div className={styles.details}>
        <span>Budget: ${category.budget}</span>
  

      {/* Edit Button */}
        <FontAwesomeIcon icon={faEdit} className={styles.editButton} />
        </div>

    </div>
  );
};

export default GridItem;
