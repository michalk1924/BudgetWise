"use client";

import React from "react";
import styles from "./categories.module.css";
import {BudgetGrid, AddNewBudget, GridItem, BudgetDoughnutChart}  from "../components/index";
import { Category } from "../../types/types";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";

const Categories = () => {
  const { user, addCategory, updateCategory } = useUserStore();

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async ({
      id,
      category,
    }: {
      id: string;
      category: Category;
    }) => {
      if (user) {
        console.log("category to add", category);
        const response = await userService.updateUser(id, {
          categories: [...user?.categories, category],
        });
        addCategory(category);
        return response;
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: (error: Error) => {
      console.error("Error updating user:", error.message);
    },
  });

  const total = user?.categories?.reduce(
    (acc, category) => {
      acc.budget += category.budget;
      acc.spent += category.spent;
      return acc;
    },
    { budget: 0, spent: 0 }
  );

  const updateUserMutationUpdateCategory = useMutation({
    mutationFn: async ({ id, category }: { id: string; category: Category }) => {
      if (user) {
        const response = await userService.updateUser(id, { categories: user?.categories.map((c) => c._id === category._id ? category : c) });
        updateCategory(category);
        return response;
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error.message);
    },
  });
  const handleAddCategory = (category: Category) => {
    category._id = Math.random().toString(36).substr(2, 8);
    updateUserMutation.mutate({ id: user?._id ?? "", category });
  };

  const handleUpdateCategory = (category: Category) => {
    updateUserMutationUpdateCategory.mutate({ id: user?._id ?? "", category });
  };

  return (
    <div>
    <div className={styles.page}>
      <section className={styles.leftSection}>

        <header className={styles.title}>
        <span>BUDGET SETTING</span>

        </header>

        <section className={styles.totalsSection}>
        <BudgetDoughnutChart categories={user?.categories ?? []} />

          {total && (
            <GridItem
              key="total"
              category={{
                _id: "total",
                categoryName: "Monthly Total Budget",
                description: "Total budget for the month",
                budget: total.budget,
                spent: total.spent,
              }}
              isTotal={true}
            />
          )}
        </section>
      </section>

      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          {user && user?.categories?.length > 0 && (
            <BudgetGrid categories={user?.categories || []} onUpdateCategory={handleUpdateCategory}/>
          )}
        </section>

        <section className={styles.addBudgetSection}>
          {user && <AddNewBudget addCategory={handleAddCategory} />} 
        </section>
      </section>
    </div>
    </div>
  );
};

export default Categories;
