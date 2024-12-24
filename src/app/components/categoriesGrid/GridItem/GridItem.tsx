"use client";

import React, { useState } from "react";
import styles from "./GridItem.module.css";
import ProgressBar from "./ProgressBar/ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Category } from "../../../../types/types";

interface GridItemProps {
  category: Category;
  isTotal?: boolean; 
  budget?: number; 
  spent?: number; 
  onUpdateCategory?: (updatedCategory: Category) => void; 
}

const GridItem: React.FC<GridItemProps> = ({
  category,
  isTotal = false,
  budget,
  spent,
  onUpdateCategory,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category>(category); 

  const [isSmallScreen, setIsSmallScreen] = useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedCategory(category); 
  };

  const handleSaveClick = () => {
    setIsEditing(false); 
    if (onUpdateCategory) {
      onUpdateCategory(editedCategory); 
    }
  };

  const handleInputChange = (field: keyof Category, value: string | number) => {
    setEditedCategory((prev) => ({ ...prev, [field]: value }));
  };


  // Use overrides if provided, otherwise default to category values
  const effectiveBudget = Number(budget ?? category.budget ?? 0);
  const effectiveSpent = Number(spent ?? category.spent ?? 0);
  const percentage = (effectiveSpent / effectiveBudget) * 100;

  return (
    <div className={isTotal ? styles.gridTotalItem : styles.gridItem}>
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

        <ProgressBar percentage={percentage} />

        <div className={styles.details}>
          <span className={styles.budget}>
            {isTotal && isSmallScreen ? "Monthly Budget: " : "Budget: "}
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
      </div>

      );
};

      export default GridItem;
