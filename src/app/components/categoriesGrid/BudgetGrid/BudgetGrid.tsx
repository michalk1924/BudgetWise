"use client";

import React, { useState } from "react";
import styles from "./BudgetGrid.module.css";
import GridItem from "../GridItem/GridItem";
import YearMonthSelector from "../YearMonthSelector/YearMonthSelector";
import { Category } from "../../../../types/types";

interface BudgetGridProps {
  categories: Category[];
  onUpdateCategory?: (updatedCategory: Category) => void; 

}

const BudgetGrid: React.FC<BudgetGridProps> = ({ categories , onUpdateCategory }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);


  // Filter categories by selected month and year
  const filteredCategories = categories.filter(
    (category) =>
      new Date(category.month).getFullYear() === selectedYear &&
      new Date(category.month).getMonth() === selectedMonth
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

      <div className={styles.gridContainer}>
        {filteredCategories.map((category, index) => (
          <GridItem key={index} category={category} onUpdateCategory={onUpdateCategory} />
        ))}
      </div>
      <span className={styles.seeMore}>See More...</span>
    </div>
  );
};

export default BudgetGrid;
