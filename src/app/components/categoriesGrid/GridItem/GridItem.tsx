"use client";

import React, { useState } from "react";
import styles from "./GridItem.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Category } from "../../../../types/types";

interface GridItemProps {
  category: Category;
  isTotal?: boolean; // Optional, defaults to false
  onUpdateCategory?: (updatedCategory: Category) => void; // Callback for updating the category
}

const GridItem: React.FC<GridItemProps> = ({ category, isTotal = false, onUpdateCategory }) => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedCategory, setEditedCategory] = useState<Category>(category); // State for edited category

  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  const handleCancelClick = () => {
    setIsEditing(false); // Disable edit mode
    setEditedCategory(category); // Revert changes
  };

  const handleSaveClick = () => {
    setIsEditing(false); // Disable edit mode
    if (onUpdateCategory) {
      onUpdateCategory(editedCategory); // Call the update callback
    }
  };

  const handleInputChange = (field: keyof Category, value: string | number) => {
    setEditedCategory((prev) => ({ ...prev, [field]: value }));
  };

  const percentage = (category.spent / category.budget) * 100;

  return (
    <div className={isTotal ? styles.gridTotalItem : styles.gridItem}>
      {/* Category Name */}
      <div className={isTotal ? styles.categoryTotalName : styles.categoryName}  title={category.description} >
        {isEditing ? (
          <input
            type="text"
            value={editedCategory.categoryName}
            onChange={(e) => handleInputChange("categoryName", e.target.value)}
            className={styles.editInput}
          />
        ) : (
          category.categoryName
        )}
      </div>

      {/* Spending Details */}
      <div className={styles.details}>
        <span className={styles.spent}>
          <h1 className={styles.numeric}>${category.spent.toFixed(2)}</h1>
          <span className={styles.text}>spent</span>
        </span>
        <span className={styles.left}>
          <h1 className={styles.numeric}>
          ${((category.budget - category.spent).toFixed(2))}
          </h1>
          <span className={styles.text}>left</span>
        </span>
      </div>

      {/* Progress Bar */}
      <ProgressBar percentage={percentage} />

      {/* Budget Info */}
      <div className={styles.details}>
        <span className={styles.budget}>
          Budget:{" "}
          {isEditing ? (
            <input
              type="number"
              value={editedCategory.budget.toFixed(2)}
              onChange={(e) => handleInputChange("budget", Number(e.target.value))}
              className={styles.editInput}
            />
          ) : (
            <h1 className={styles.numeric}>${category.budget.toFixed(2)}</h1>
          )}
        </span>
        {!isEditing ? (
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.editButton}
            onClick={handleEditClick}
          />
        ) : (
          <div className={styles.editActions}>
            <button className={styles.saveButton} onClick={handleSaveClick}>
              Save
            </button>
            <button className={styles.cancelButton} onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GridItem;
