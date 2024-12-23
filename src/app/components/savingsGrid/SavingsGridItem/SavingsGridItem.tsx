"use client";

import React, { useState } from "react";
import styles from "./SavingsGridItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Saving,Transaction } from "../../../../types/types";
import ProgressCircle from "./ProgressCircle/ProgressCircle";
import { useMutation, useQueryClient } from "@tanstack/react-query";


interface SavingGridItemProps {
  saving: Saving;
  onUpdateSaving?: (updatedSaving: Saving) => void;
  onWithdrawSaving?: (updatedSaving: Saving) => void;
}

const SavingsGridItem: React.FC<SavingGridItemProps> = ({
  saving,
  onUpdateSaving,
  onWithdrawSaving
}) => {
  const [isEditing, setIsEditing] = useState(false); // מצב עריכה
  const [editedSaving, setEditedSaving] = useState<Saving>(saving); // עדכון החיסכון


  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedSaving(saving);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    if (onUpdateSaving) {
      onUpdateSaving(editedSaving);
    }
  };

  const handleInputChange = (field: keyof Saving, value: string | number) => {
    setEditedSaving((prev) => ({ ...prev, [field]: value }));
  };

  const formatDate = (date: Date) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const percentage =
    (editedSaving.currentAmount / editedSaving.targetAmount) * 100;

  return (
    <div key={saving._id} className={styles.gridItem}>
      {/* שם המטרה */}
      {isEditing ? (
        <input
          type="text"
          value={editedSaving.goalName}
          onChange={(e) => handleInputChange("goalName", e.target.value)}
          className={styles.editInput}
        />
      ) : (
        <h2 className={styles.goalName}>{saving.goalName}</h2>
      )}

      {/* עיגול הפרוגרס */}
      <ProgressCircle
        percentage={percentage}
        current={editedSaving.currentAmount}
        target={editedSaving.targetAmount}
        isEditing={isEditing}
        onTargetChange={(value) => handleInputChange("targetAmount", value)}
      />
      {/* תאריך היעד */}
      {isEditing ? (
        <input
          type="date"
          value={formatDate(editedSaving.deadline)}
          onChange={(e) => handleInputChange("deadline", e.target.value)}
          className={styles.editInput}
        />
      ) : (
        <span className={styles.deadline}>
          Deadline: {new Date(editedSaving.deadline).toLocaleDateString()}
        </span>
      )}

      {/* כפתור עריכה ושמירה */}
      {!isEditing ? (
        <>
          <FontAwesomeIcon
            icon={faEdit}
            className={styles.editButton}
            onClick={handleEditClick}
          />
          {/* כפתור משיכת חיסכון */}
          <button
            className={styles.withdrawButton}
            onClick={() => onWithdrawSaving?.(saving)}
          >
            Withdraw Savings 💸
          </button>
        </>
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
  );
};

export default SavingsGridItem;
