"use client"

import React from "react";
import styles from "./savings.module.css";
import { SavingsGrid, AddNewSaving } from "../components/index";
import { Saving } from "@/types/types";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';

const Savings = () => {

  const { user, addSaving } = useUserStore();

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

  const handleAddSaving = async (saving: Saving) => {
    updateUserMutation.mutate({ id: user?._id ?? '', saving });
  };

  return (
    <div className={styles.page}>
      {/* Title Section */}
      <header className={styles.title}>
        <span>Saving For Big Goals</span>
      </header>

      <section className={styles.mainSection}>
        <section className={styles.tableSection}>
          <SavingsGrid savings={user?.savings ? user.savings : []} />
        </section>

        <section className={styles.addSavingSection}>
          <AddNewSaving addSaving={handleAddSaving} />
        </section>
      </section>
    </div>
  )
}


export default Savings;
