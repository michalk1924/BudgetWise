"use client"

import React from "react";
import styles from "./savings.module.css";
import { SavingsGrid, AddNewSaving } from "../components/index";
import { Saving,Transaction} from "@/types/types";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';
import { showAlertWithTwoOptions } from "@/services/alerts";

const Savings = () => {

  const { user, addSaving, updateSaving, addTransaction ,removeSaving} = useUserStore();

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
  const deleteSavingMutation = useMutation({
    mutationFn: async ({ id, savingId }: { id: string; savingId: string }) => {
      if (user) {
        const updatedSavings = user.savings.filter((saving) => saving._id !== savingId);
        const response = await userService.updateUser(id, { savings: updatedSavings });
        // Assuming you have a function to remove the saving from local state
        removeSaving(savingId); 
        return response;
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error deleting saving:', error.message);
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
    await showAlertWithTwoOptions(
      "successfuly withdraw "+saving.goalName+"!",
      "Would you like continue saving for "+saving.goalName+"?",
      "continue saving",
      "delete saving",
      handleContinueSaving,
      handleDeleteSaving
    );
    
  };
  const handleContinueSaving = () => {
    console.log("Option 1 selected");
  };
  
  const handleDeleteSaving = () => {
    console.log("Option 2 selected");
   // deleteSavingMutation.mutate({ id: user?._id ?? '', savingId:saving._id });
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
