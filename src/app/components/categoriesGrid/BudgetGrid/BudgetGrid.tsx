"use client";

import React, { useState } from "react";
import styles from "./BudgetGrid.module.css";
import {GridItem,YearMonthSelector} from "../../index"
import { Category } from "../../../../types/types";

interface BudgetGridProps {
  categories: Category[];
  onUpdateCategory?: (updatedCategory: Category) => void;
}

const BudgetGrid: React.FC<BudgetGridProps> = ({ categories, onUpdateCategory }) => {
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const filteredCategories = categories.filter((category) => {
    if (selectedYear === currentYear && selectedMonth === currentMonth) {
      return true; 
    }

    return category.monthlyBudget?.some(
      (budget) =>
        new Date(budget.month).getFullYear() === selectedYear &&
        new Date(budget.month).getMonth() === selectedMonth
    );
  });

  return (
    <div className={styles.wrapper}>
      <YearMonthSelector
        selectedYear={selectedYear}
        selectedMonth={selectedMonth}
        onYearChange={setSelectedYear}
        onMonthChange={setSelectedMonth}
      />

      <div className={styles.gridContainer}>
        {filteredCategories.map((category, index) => {
          // אם החודש הנבחר הוא הנוכחי, נשתמש בערכים הראשיים
          const isCurrentMonth = selectedYear === currentYear && selectedMonth === currentMonth;
          const budget = isCurrentMonth ? category.budget : undefined;
          const spent = isCurrentMonth ? category.spent : undefined;

          return (
            <GridItem
              key={index}
              category={category}
              budget={budget}
              spent={spent}
              onUpdateCategory={onUpdateCategory}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BudgetGrid;
