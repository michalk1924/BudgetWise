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
  budget?: number; // Optional, overrides category.budget
  spent?: number; // Optional, overrides category.spent
  onUpdateCategory?: (updatedCategory: Category) => void; // Callback for updating the category
}

const GridItem: React.FC<GridItemProps> = ({
  category,
  isTotal = false,
  budget,
  spent,
  onUpdateCategory,
}) => {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [editedCategory, setEditedCategory] = useState<Category>(category); // State for edited category

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Listen for screen size changes
  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Use overrides if provided, otherwise default to category values
  const effectiveBudget = budget ?? category.budget;
  const effectiveSpent = spent ?? category.spent;
  const percentage = (effectiveSpent / effectiveBudget) * 100;

  return (
    <div className={isTotal ? styles.gridTotalItem : styles.gridItem}>
      {/* Category Name */}
      <div className={isTotal ? styles.categoryTotalName : styles.categoryName} >
      <div
        className={isTotal ? styles.categoryTotalName : styles.categoryName}
        title={category.description}
      >
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
          <h1 className={styles.numeric}>${effectiveSpent.toFixed(2)}</h1>
          <span className={styles.text}>spent</span>
        </span>
        <span className={styles.left}>
          <h1 className={styles.numeric}>
            ${(effectiveBudget - effectiveSpent).toFixed(2)}
          </h1>
          <span className={styles.text}>left</span>
        </span>
      </div>

      {/* Progress Bar */}
      <ProgressBar percentage={percentage} />

      {/* Budget Info */}
      <div className={styles.details}>
       
        <span className={styles.budget}>
          { isTotal && isSmallScreen ? "Monthly Budget: ": "Budget: "}
          {isEditing ? (
            <input
              type="number"
              value={editedCategory.budget.toFixed(2)}
              onChange={(e) => handleInputChange("budget", Number(e.target.value))}
              className={styles.editInput}
            />
          ) : (
            <h1 className={styles.numeric}>${effectiveBudget.toFixed(2)}</h1>
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
