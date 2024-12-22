"use client"

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./AddTransaction.module.css";
import { Transaction, Category } from "../../../../types/types";

const transactionSchema = z.object({
    type: z.enum(['income', 'expense', 'saved']),
    category: z.string().min(1, "Category is required"),
    date: z.string().min(1, "Date is required")
        .refine((dateString) => new Date(dateString) < new Date(), { message: "Date must be before today", }),
    amount: z.number({ invalid_type_error: "amount must be a number" }),
    description: z.string().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;

interface AddTransactionProps {
    transactions: Transaction[];
    categories: Category[];
    addTransaction: (transaction: Transaction) => void;
}

export default function AddTransaction({ transactions, addTransaction, categories }: AddTransactionProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
    });

    const onSubmit: SubmitHandler<TransactionInput> = async (data: TransactionInput) => {
        const transaction: Transaction =
        {
            _id: "",
            date: new Date(data.date),
            amount: Number(data.amount),
            description: data.description || "",
            createdAt: new Date(),
            updatedAt: new Date(),
            type: data.type,
        }
        addTransaction(transaction);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addTransaction}>

            <div className={styles.formGroup}>
                <select className={styles.select} {...register("type")} defaultValue="">
                    <option value="" disabled>
                        Select a type
                    </option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                    <option value="saved">Saved</option>
                </select>
                {errors.type && (
                    <p className={styles.error}>{String(errors.type.message)}</p>
                )}
            </div>


            {/* Category Selector */}
            <div className={styles.formGroup}>
                <select
                    className={styles.select}
                    {...register("category")}
                    defaultValue=""
                >
                    <option value="" disabled>
                        Select a category
                    </option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>
                {errors.category && (
                    <p className={styles.error}>{String(errors.category.message)}</p>
                )}
            </div>

            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="date"
                    {...register("date")}
                />
                {errors.date && <p className={styles.error}>{errors.date.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="number"
                    placeholder="Sum"
                    {...register("amount", { valueAsNumber: true })}
                />
                {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
            </div>

            <div className={styles.formGroup}>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Description (Optional)"
                    {...register("description")}
                />
            </div>

            <button className={styles.addButton} type="submit">
                Add
            </button>
        </form>
    )

}