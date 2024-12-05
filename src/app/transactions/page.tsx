"use client"

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./transactions.module.css";
import { TransactionTable } from '../components/index';
import { Transaction } from '../../types/types';

const transactionSchema = z.object({
  category: z.string().min(1, "Category is required"),
  date: z.string().min(1, "Date is required"), amount: z
    .number({ invalid_type_error: "amount must be a number" }),
  description: z.string().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;

function Transactions() {

  const [transactions, setTransactions] = useState<Array<Transaction>>([
    {
      _id: "1",
      userId: "user123",
      category: "Food",
      type: "expense", // סוג ההוצאה
      amount: 100,
      description: "Burger",
      date: new Date("2022-01-01"),
      createdAt: new Date("2022-01-01"),
      updatedAt: new Date("2022-01-01"),
    },
    {
      _id: "2",
      userId: "user123",
      category: "Transportation",
      type: "expense", // סוג ההוצאה
      amount: 50,
      description: "Car rental",
      date: new Date("2022-01-02"),
      createdAt: new Date("2022-01-02"),
      updatedAt: new Date("2022-01-02"),
    },
    {
      _id: "3",
      userId: "user123",
      category: "Entertainment",
      type: "income",
      amount: 20,
      description: "Movie",
      date: new Date("2022-01-03"),
      createdAt: new Date("2022-01-03"),
      updatedAt: new Date("2022-01-03"),
    },
    {
      _id: "4",
      userId: "user123",
      category: "Utilities",
      type: "expense",
      amount: 70,
      description: "Electricity bill",
      date: new Date("2022-01-04"),
      createdAt: new Date("2022-01-04"),
      updatedAt: new Date("2022-01-04"),
    },
    {
      _id: "5",
      userId: "user123",
      category: "Others",
      type: "expense",
      amount: 10,
      description: "Dinner",
      date: new Date("2022-01-05"),
      createdAt: new Date("2022-01-05"),
      updatedAt: new Date("2022-01-05"),
    },
    {
      _id: "6",
      userId: "user123",
      category: "Food",
      type: "expense",
      amount: 50,
      description: "Lunch",
      date: new Date("2022-01-06"),
      createdAt: new Date("2022-01-06"),
      updatedAt: new Date("2022-01-06"),
    },
    {
      _id: "7",
      userId: "user123",
      category: "Transportation",
      type: "expense",
      amount: 20,
      description: "Public",
      date: new Date("2022-01-07"),
      createdAt: new Date("2022-01-07"),
      updatedAt: new Date("2022-01-07"),
    },
    {
      _id: "8",
      userId: "user123",
      category: "Others",
      type: "expense",
      amount: 30,
      description: "Groceries",
      date: new Date("2022-01-08"),
      createdAt: new Date("2022-01-08"),
      updatedAt: new Date("2022-01-08"),
    },
    {
      _id: "9",
      userId: "user123",
      category: "Food",
      type: "expense",
      amount: 30,
      description: "Snacks",
      date: new Date("2022-01-09"),
      createdAt: new Date("2022-01-09"),
      updatedAt: new Date("2022-01-09"),
    }
  ]);


  const [categories, setCategories] = useState<string[]>([
    "Food",
    "Transport",
    "Entertainment",
    "Utilities",
    "Others",
  ]);

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
      category: data.category,
      date: new Date(data.date),
      amount: Number(data.amount),
      description: data.description || "",
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: "123",
      type: data.amount > 0 ? 'income' : 'expense',
    }
    setTransactions(prev => [...prev, transaction]);
    reset();
  };

  return (
    <div className={styles.container}>

      <h2 className={styles.title}>Manage My Transactions</h2>

      <TransactionTable transactions={transactions} />

      <div className={styles.total}>
        Total: +$
        {transactions.reduce((amount, t) => {
          if (t.type === 'expense') {
            return amount - Number(t.amount || 0);
          }
          return amount + Number(t.amount || 0);
        }, 0).toFixed(2)}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.addTransaction}>
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
              <option key={index} value={category}>
                {category}
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
    </div>
  )
}

export default Transactions;