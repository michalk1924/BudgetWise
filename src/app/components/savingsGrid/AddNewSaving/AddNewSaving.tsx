"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./AddNewSaving.module.css";
import { Saving } from "../../../../types/types";

const savingSchema = z.object({
  goalName: z.string().min(1, "Goal Name is required"),
  targetAmount: z.number({ invalid_type_error: "Target Amount must be a number" }).positive("Target Amount must be positive"),
  currentAmount: z
    .number({ invalid_type_error: "Current Amount must be a number" })
    .min(0, "Current Amount cannot be negative")
    .optional()
    .default(0),
  deadline: z
    .string()
    .min(1, "Deadline is required")
    .refine((dateString) => new Date(dateString) > new Date(), {
      message: "Deadline must be a future date",
    }),
});

export type SavingInput = z.infer<typeof savingSchema>;

interface AddSavingProps {
  addSaving: (saving: Saving) => void;
}

export default function AddSaving({ addSaving }: AddSavingProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SavingInput>({
    resolver: zodResolver(savingSchema),
  });

  const onSubmit: SubmitHandler<SavingInput> = (data) => {
    const saving: Saving = {
      _id: `saving-${Date.now()}`,
      goalName: data.goalName,
      targetAmount: data.targetAmount,
      currentAmount: data.currentAmount || 0,
      deadline: new Date(data.deadline),
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    };

    addSaving(saving);
    reset(); // Clear the form after successful submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.addSaving}>

      <input
        className={styles.input}
        type="text"
        placeholder="Goal Name"
        {...register("goalName")}
      />
      {errors.goalName && <p className={styles.error}>{errors.goalName.message}</p>}

        <input
          className={styles.input}
          type="number"
          placeholder="Target Amount"
          {...register("targetAmount", { valueAsNumber: true })}
        />
        {errors.targetAmount && (
          <p className={styles.error}>{errors.targetAmount.message}</p>
        )}

        <input
          className={styles.input}
          type="number"
          placeholder="Current Amount (Optional)"
          {...register("currentAmount", { valueAsNumber: true })}
        />
        {errors.currentAmount && (
          <p className={styles.error}>{errors.currentAmount.message}</p>
        )}

      <input
        className={styles.input}
        type="date"
        {...register("deadline")}
      />
      {errors.deadline && <p className={styles.error}>{errors.deadline.message}</p>}

      <button className={styles.addButton} type="submit">
        Add Saving
      </button>
    </form>
  );
}
