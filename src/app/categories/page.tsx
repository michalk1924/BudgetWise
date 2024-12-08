"use client";

import React from "react";
import styles from "./categories.module.css";
import BudgetGrid from "../components/categoriesGrid/BudgetGrid/BudgetGrid";
import AddNewBudget from "../components/categoriesGrid/AddNewBudget/AddNewBudget";
import GridItem from "../components/categoriesGrid/GridItem/GridItem";
import { UserCategory } from "../../types/types";

const total:UserCategory={
    _id: "total",
    userId: "123",
    type: "general",
    name: "Monthly  Total  Budget",
    description: "Total budget for the month",
    budget: 300,
    spent: 150,
    month: new Date(2024, 0), // January 2024,
  };

// Categories Data
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
  {
    _id: "4",
    userId: "123",
    type: "personal",
    name: "ll",
    description: "Movies, games, and other fun activities",
    budget: 50,
    spent: 70,
    month: new Date(2024, 1), // February 2024
  },
  {
    _id: "5",
    userId: "123",
    type: "personal",
    name: "llllllllll",
    description: "Movies, games, and other fun activities",
    budget: 70,
    spent: 70,
    month: new Date(2024, 1), // February 2024
  },
  {
    _id: "6",
    userId: "123",
    type: "personal",
    name: "yyyyy",
    description: "Movies, games, and other fun activities",
    budget: 75,
    spent: 70,
    month: new Date(2024, 1), // February 2024
  },
  {
    _id: "7",
    userId: "123",
    type: "personal",
    name: "yyllyyy",
    description: "Movies, games, and other fun activities",
    budget: 75,
    spent: 70,
    month: new Date(2024, 1), // February 2024
  },
];

const Categories = () => {
  return (
    <div className={styles.page}>
      <section className={styles.leftSection}>
        <header className={styles.title}>
          <span>BUDGET SETTING</span>
        </header>

        {/* Totals Section */}
        <section className={styles.totalsSection}>
          <GridItem key={1} category={total} isTotal={true} />
        </section>
      </section>
      
      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          {/* Pass categories as a prop to BudgetGrid */}
          <BudgetGrid categories={categories} />
        </section>

        <section className={styles.addBudgetSection}>
          <AddNewBudget />
        </section>
      </section>
    </div>
  );
};

export default Categories;
