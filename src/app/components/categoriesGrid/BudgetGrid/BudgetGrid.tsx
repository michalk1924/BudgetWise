import React from "react";
import styles from "./BudgetGrid.module.css";
import GridItem from "../GridItem/GridItem";
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
  },
  {
    _id: "2",
    userId: "123",
    type: "general",
    name: "Transportation",
    description: "Spending on public transport or fuel",
    budget: 100,
    spent: 30,
  },
  {
    _id: "3",
    userId: "123",
    type: "personal",
    name: "Entertainment",
    description: "Movies, games, and other fun activities",
    budget: 150,
    spent: 70,
  },
];

const BudgetGrid: React.FC = () => {
  return (
    <div className={styles.gridContainer}>
      {categories.map((category, index) => (
        <GridItem key={index} category={category} />
      ))}
    </div>
  );
};

export default BudgetGrid;
