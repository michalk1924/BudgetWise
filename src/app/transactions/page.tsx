"use client"

import React, { useState } from 'react';
import styles from "./transactions.module.css";
import { AddTransaction, TransactionTable } from '../components/index';
import { Transaction } from '../../types/types';
import useUserStore from "../../store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';
import UploadExcel from "../components/UploadExcel/UploadExcel";


function Transactions() {

  const { user, addTransaction, updateTransaction, loading } = useUserStore();

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

  const handleAddTransaction = (transaction: Transaction) => {
    transaction._id = Math.random().toString(36).substr(2, 8);
    updateUserMutationAddTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  const handleUpdateTransaction = (transaction: Transaction) => {
    updateUserMutationUpdateTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  return (
    <div className={styles.container}>
      <UploadExcel/>

      <h2 className={styles.title}>Manage My Transactions</h2>

      {user && user?.transactions?.length > 0 && <TransactionTable transactions={user?.transactions}
        updateTransaction={handleUpdateTransaction}
      />}

      {user && <AddTransaction transactions={user?.transactions} addTransaction={handleAddTransaction} />}

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