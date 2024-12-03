"use client";

import React from "react";
import styles from "./YearMonthSelector.module.css";

interface YearMonthSelectorProps {
  selectedYear: number;
  selectedMonth: number;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number) => void;
}

const YearMonthSelector: React.FC<YearMonthSelectorProps> = ({
  selectedYear,
  selectedMonth,
  onYearChange,
  onMonthChange,
}) => {
  return (
    <div className={styles.filterContainer}>
      {/* Year Group */}
      <div className={styles.filterGroup}>
        <label htmlFor="yearFilter">Year:</label>
        <select
          id="yearFilter"
          value={selectedYear}
          onChange={(e) => onYearChange(Number(e.target.value))}
          className={styles.dropdown}
        >
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
      </div>

      {/* Month Group */}
      <div className={styles.filterGroup}>
        <label htmlFor="monthFilter">Month:</label>
        <select
          id="monthFilter"
          value={selectedMonth}
          onChange={(e) => onMonthChange(Number(e.target.value))}
          className={styles.dropdown}
        >
          <option value={0}>January</option>
          <option value={1}>February</option>
          <option value={2}>March</option>
          <option value={3}>April</option>
          <option value={4}>May</option>
          <option value={5}>June</option>
          <option value={6}>July</option>
          <option value={7}>August</option>
          <option value={8}>September</option>
          <option value={9}>October</option>
          <option value={10}>November</option>
          <option value={11}>December</option>
        </select>
      </div>
    </div>
  );
};

export default YearMonthSelector;
