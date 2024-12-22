// src/components/SavingsGrid/SavingsGrid.tsx
import React from "react";
import styles from "./SavingsGrid.module.css";
import SavingsGridItem from "../SavingsGridItem/SavingsGridItem";
import { Saving } from "@/types/types";

interface SavingsGridProps {
  savings: Saving[]
  onUpdateSaving?: (updatedSaving: Saving) => void;
  onWithdrawSaving ?: (updatedSaving: Saving) => void;

}

const SavingsGrid: React.FC<SavingsGridProps> = ({ savings,onUpdateSaving ,onWithdrawSaving}) => {

  return (
    <div className={styles.gridContainer}>
      {savings.map((saving, index) => (
        <SavingsGridItem key={index} saving={saving} onUpdateSaving={onUpdateSaving} onWithdrawSaving={onWithdrawSaving}/>
      ))}
    </div>
  );
};

export default SavingsGrid;
