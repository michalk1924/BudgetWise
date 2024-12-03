"use client";

import React, { useState } from "react";
import styles from "./BudgetGrid.module.css";
import GridItem from "../GridItem/GridItem";
import YearMonthSelector from "../YearMonthSelector/YearMonthSelector";
import { UserCategory } from "../../../../types/types";

const categories: UserCategory[] = [
  {
    _id: "1",
    userId: "123",
    type: "general",
    name: "Groceries",
    description: "Spending on food and supplies",
    budget: 100,
    spent: 50,
    month: new Date(2024, 0), // January 2024
  },
  {
    _id: "2",
    userId: "123",
    type: "general",
    name: "Transportation",
    description: "Spending on public transport or fuel",
    budget: 100,
    spent: 30,
    month: new Date(2024, 0), // January 2024
  },
  {
    _id: "3",
    userId: "123",
    type: "personal",
    name: "Entertainment",
    description: "Movies, games, and other fun activities",
    budget: 150,
    spent: 70,
    month: new Date(2024, 1), // February 2024
  },
];

const BudgetGrid: React.FC = () => {
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
