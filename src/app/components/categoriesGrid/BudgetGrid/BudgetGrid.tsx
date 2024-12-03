"use client";

import React, { useState } from "react";
import styles from "./BudgetGrid.module.css";
import GridItem from "../GridItem/GridItem";
import YearMonthSelector from "../YearMonthSelector/YearMonthSelector";
import { UserCategory } from "../../../../types/types";

interface BudgetGridProps {
  categories: UserCategory[];
}

const BudgetGrid: React.FC<BudgetGridProps> = ({ categories }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(0); // Default to January

  // Filter categories by selected month and year
  const filteredCategories = categories.filter(
    (category) =>
      category.month.getFullYear() === selectedYear &&
      category.month.getMonth() === selectedMonth
  );

  return (
    <div className={styles.wrapper}>
      {/* Year and Month Selector */}
      <YearMonthSelector
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
      />

      {/* Grid */}
      <div className={styles.gridContainer}>
        {filteredCategories.map((category, index) => (
          <GridItem key={index} category={category} />
        ))}
      </div>
      <span className={styles.seeMore}>See More...</span>
    </div>
  );
};

export default BudgetGrid;
