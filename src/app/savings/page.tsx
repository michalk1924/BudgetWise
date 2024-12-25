"use client"

import React from "react";
import styles from "./savings.module.css";
import { SavingsGrid, AddNewSaving } from "../components/index";
import { Saving,Transaction} from "@/types/types";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';
import { showSuccessAlert } from "@/services/alerts";

const Savings = () => {

  const { user, addSaving, updateSaving, addTransaction } = useUserStore();

  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, saving }: { id: string; saving: Saving }) => {
      if (user) {
        const response = await userService.updateUser(id, { savings: [...user?.savings, saving] });
        addSaving(saving);
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
  const handleAddSaving = async (saving: Saving) => {
    saving._id = Math.random().toString(36).substr(2, 8);
    updateUserMutation.mutate({ id: user?._id ?? '', saving });
  };
  const handleUpdateSaving = async (saving: Saving) => {
    updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving });
  };
  const handleWithdrawSavings = async (saving: Saving) => {
    let transaction: Transaction={
      _id:Math.random().toString(36).substr(2, 8),
      category: 'saving',
      type: 'income',
      amount: saving.currentAmount,
      description: 'for: ' +saving.goalName,
      date: new Date,
      createdAt: new Date,
      updatedAt: new Date,
    };
    saving.currentAmount=0;
    updateUserMutationAddTransaction.mutate({id: user?._id ?? '',transaction});
    updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving });
    await showSuccessAlert("Welcome", "You have logged in successfully!", 1000);

  };

  return (
    <div className={styles.page}>
      {/* Title Section */}
      <header className={styles.title}>
        <span>Saving For Big Goals</span>
      </header>

      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          <SavingsGrid savings={user?.savings ? user.savings : []} onUpdateSaving={handleUpdateSaving} onWithdrawSaving={handleWithdrawSavings}/>
        </section>

        <section className={styles.addSavingSection}>
          <AddNewSaving addSaving={handleAddSaving} />
        </section>
      </section>
    </div>
  )
}


export default Savings;
