// src/components/SavingsGrid/SavingsGrid.tsx
import React from "react";
import styles from "./SavingsGrid.module.css";
import SavingsGridItem from "../SavingsGridItem/SavingsGridItem";
import { UserSaving } from "@/types/types";

interface SavingsGridProps{
  savings:UserSaving[]
}

const SavingsGrid:React.FC<SavingsGridProps> = ({ savings }) => {
  return (
    <div className={styles.gridContainer}>
      {savings.map((saving,index) => (
         <SavingsGridItem key={index} saving={saving} />
      ))}
    </div>
  );
};

export default SavingsGrid;
