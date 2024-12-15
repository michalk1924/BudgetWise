// src/components/SavingsGrid/SavingsGrid.tsx
import React from "react";
import styles from "./SavingsGrid.module.css";
import SavingsGridItem from "../SavingsGridItem/SavingsGridItem";
import { Saving } from "@/types/types";

interface SavingsGridProps {
  savings: Saving[]
}

const SavingsGrid: React.FC<SavingsGridProps> = ({ savings }) => {

  return (
    <div className={styles.gridContainer}>
      {savings.map((saving, index) => (
        <SavingsGridItem key={index} saving={saving} />
      ))}
    </div>
  );
};

export default SavingsGrid;
