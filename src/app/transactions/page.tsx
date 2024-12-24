"use client"

import React, { useState } from 'react';
import styles from "./transactions.module.css";
import { AddTransaction, TransactionTable } from '../components/index';
import { Transaction, Saving, Category, User, MonthlyBudget } from '../../types/types';
import useUserStore from "../../store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';
import UploadExcel from "../components/UploadExcel/UploadExcel";


function Transactions() {

  const { user, addTransaction, updateTransaction, updateSaving, updateCategory, removeTransaction, loading } = useUserStore();

  const queryClient = useQueryClient();

  const updateUserMutationAddTransaction = useMutation({
    mutationFn: async ({ id, transaction }: { id: string; transaction: Transaction }) => {
      if (user) {

        try {
          addTransaction(transaction);
          const response = await userService.updateUser(id, { transactions: [...user?.transactions, transaction] });
        } catch (error) {
          console.error('Error updating user:', error);
          removeTransaction(transaction._id);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error.message);
    },
  });

  const updateUserMutationUpdateTransaction = useMutation({
    mutationFn: async ({ id, transaction }: { id: string; transaction: Transaction }) => {
      if (user) {
        const response = await userService.updateUser(id, { transactions: user?.transactions.map((t) => t._id === transaction._id ? transaction : t) });
        updateTransaction(transaction);
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

  const updateUserMutationUpdateSaving = useMutation({
    mutationFn: async ({ id, saving }: { id: string; saving: Saving }) => {
      if (user) {
        const response = await userService.updateUser(id, { savings: user?.savings.map((c) => c._id === saving._id ? saving : c) });
        updateSaving(saving);
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

  const handleAddTransaction = async (transaction: Transaction) => {

    transaction._id = Math.random().toString(36).substr(2, 8);
    transaction.category = 'abc';

    if (transaction?.category == 'saving') {
      let saving = user?.savings.find((s) => s.goalName === transaction.description)
      if (saving && typeof saving.currentAmount === "number") {
        saving.currentAmount += transaction.amount;
        updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving });
      }
    }

    else {
      try {
        if (user) {
          const category = updateCategoryF(user, transaction);
          console.log("category" + JSON.stringify(category));

          if (category) {
            updateUserMutationUpdateCategory.mutate({ id: user?._id ?? '', category });
          }
        }
      }
      catch (error) {
        console.error('Error updating category:', error);
      }
    }

    updateUserMutationAddTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  const handleUpdateTransaction = (transaction: Transaction) => {
    updateUserMutationUpdateTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  const updateCategoryF = (user: User, transaction: Transaction): Category | undefined => {

    const currentMonth = new Date().getMonth();

    const categoryIndex = user.categories.findIndex(
      (category) => category.categoryName === transaction.category
    );

    if (categoryIndex !== -1) {

      const category = { ...user.categories[categoryIndex] };

      console.log("category: " + JSON.stringify(category));

      if (new Date(transaction.date).getMonth() === currentMonth) {
        if (transaction.type === 'expense') {
          category.spent = (category.spent || 0) + transaction.amount;
        }
        else if (transaction.type === 'income') {
          category.spent = (category.spent || 0) - transaction.amount;
        }
      }

      else {

        if (!category.monthlyBudget) {
          category.monthlyBudget = [];
        }

        console.log("monthly budget: " + category.monthlyBudget);


        const monthIndex = category.monthlyBudget?.findIndex(
          (monthlyBudget) =>
            new Date(monthlyBudget.month).getMonth() === transaction.date.getMonth()
        );

        console.log("monthIndex: " + monthIndex);
        console.log("monthlyBudget" + JSON.stringify(category.monthlyBudget));
        

        if (monthIndex !== -1 && category.monthlyBudget) {
          console.log("33");
          
          let updatedMonth : MonthlyBudget;

          if (transaction.type === 'expense') {
            updatedMonth = {
              ...category.monthlyBudget[monthIndex],
              spent: (category.monthlyBudget[monthIndex].spent || 0) + transaction.amount,
            };
          }

          else if (transaction.type === 'income') {
            updatedMonth = {
              ...category.monthlyBudget[monthIndex],
              spent: (category.monthlyBudget[monthIndex].spent || 0) - transaction.amount,
            };
          }

          category.monthlyBudget = category.monthlyBudget.map((month, index) =>
            index === monthIndex ? { ...month, ...updatedMonth } : month
          );
        }


        else {
          console.log("hhh");
          
          category.monthlyBudget = [
            ...category.monthlyBudget,
            {
              _id: Math.random().toString(36).substr(2, 9),
              month: transaction.date,
              budget: category.budget,
              spent: transaction.amount,
            },
          ];
        }

      }

      return category;
    }
    else { return undefined };
  }

  return (
    <div className={styles.container}>

      {!loading && user && <div className={styles.main}>

        <UploadExcel />


        {user && user?.transactions?.length > 0 && <TransactionTable transactions={user?.transactions}
          updateTransaction={handleUpdateTransaction} categories={user?.categories}
        />}

        {user && <AddTransaction transactions={user?.transactions} addTransaction={handleAddTransaction}
          categories={user?.categories} />}
      </div>}

      {!loading && user && <div className={styles.headers}>
        <h2 className={styles.title}>Manage My Transactions</h2>
        {user && <div className={styles.total}>
          Total:
          {user?.transactions?.reduce((amount, t) => {
            if (t.type === 'expense') {
              return amount - Number(t.amount || 0);
            }
            return amount + Number(t.amount || 0);
          }, 0).toFixed(2)}
          $
        </div>}
      </div>}

      {loading && <div className={styles.loader}>Loading...</div>}

      {!loading && user && user?.transactions?.length === 0 && <div>
        No transactions found. Add some today!
      </div>}

      {!loading && !user && <div className={styles.loader}>
        {/* Please log in to access this feature. */}
      </div>}

    </div>
  )
}

export default Transactions;