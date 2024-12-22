"use client"

import React, { useState } from 'react';
import styles from "./transactions.module.css";
import { AddTransaction, TransactionTable } from '../components/index';
import { Transaction, Saving, Category } from '../../types/types';
import useUserStore from "../../store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';
import UploadExcel from "../components/UploadExcel/UploadExcel";


function Transactions() {

  const { user, addTransaction, updateTransaction, updateSaving, updateCategory, loading } = useUserStore();

  const queryClient = useQueryClient();

  const updateUserMutationAddTransaction = useMutation({
    mutationFn: async ({ id, transaction }: { id: string; transaction: Transaction }) => {
      if (user) {
        const response = await userService.updateUser(id, { transactions: [...user?.transactions, transaction] });
        addTransaction(transaction);
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


  const handleAddTransaction = (transaction: Transaction) => {
    transaction._id = Math.random().toString(36).substr(2, 8);
    if (transaction?.category?.name == 'saving') {
      let saving = user?.savings.find((s) => s.goalName === transaction.description)
      if (saving && typeof saving.currentAmount === "number") {
        saving.currentAmount += transaction.amount;
        updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving });
      }
    }

    else {
      let category = user?.categories.find((c) => c.name === transaction?.category?.name)
      if (category && typeof category.spent === "number") {
        if (transaction.type === "expense")
          category.spent -= transaction.amount;
        else
          category.spent += transaction.amount;
        updateUserMutationUpdateCategory.mutate({ id: user?._id ?? '', category });
      }
    }
    updateUserMutationAddTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  const handleUpdateTransaction = (transaction: Transaction) => {
    updateUserMutationUpdateTransaction.mutate({ id: user?._id ?? '', transaction });
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