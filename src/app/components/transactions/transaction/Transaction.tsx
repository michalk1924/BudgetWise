"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TransactionComp.module.css";
import { Transaction } from "../../../../types/types";
import { FaPencilAlt } from "react-icons/fa";

const transactionSchema = z.object({
    category: z.string().min(1, "Category is required"),
    date: z.string()
        .min(1, "Date is required")
        .refine((dateString) => new Date(dateString) < new Date(), { message: "Date must be before today" }),
    amount: z.number({ invalid_type_error: "Amount must be a number" }).min(1, "Amount must be greater than zero"),
    description: z.string().optional(),
    paymentMethod: z.enum(["cash", "credit", "check", "bank_transfer", "bit", "other"], {
        invalid_type_error: "Payment method is required",
    }),
});

export type TransactionInput = z.infer<typeof transactionSchema>;

const TransactionComp = ({ transaction, updateTransaction }: { transaction: Transaction, updateTransaction: (transaction: Transaction) => void }) => {

    const isPositive = (type: string) => type === 'expense';

    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            category: transaction.category,
            date: transaction.date instanceof Date
                ? transaction.date.toISOString().split('T')[0]
                : new Date(transaction.date).toISOString().split('T')[0],
            amount: transaction.amount,
            description: transaction.description || "",
            paymentMethod: transaction.paymentMethod || "cash",
        },
    });

    const onSubmit: SubmitHandler<TransactionInput> = (data) => {
        const updatedTransaction: Transaction = {
            ...transaction,
            category: data.category,
            date: new Date(data.date),
            amount: data.amount,
            description: data.description || "",
            paymentMethod: data.paymentMethod,
            updatedAt: new Date(),
        };

        updateTransaction(updatedTransaction);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    return (
        <div key={transaction._id}>
            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className={styles.editForm}>
                    <div>
                        <label>Category</label>
                        <select {...register("category")}>
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Others">Others</option>
                        </select>
                        {errors.category && <p className={styles.error}>{errors.category.message}</p>}
                    </div>

                    <div>
                        <label>Date</label>
                        <input type="date" {...register("date")} />
                        {errors.date && <p className={styles.error}>{errors.date.message}</p>}
                    </div>

                    <div>
                        <label>Amount</label>
                        <input
                            type="number"
                            placeholder="Amount"
                            {...register("amount", { valueAsNumber: true })}
                        />
                        {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
                    </div>

                    <div>
                        <label>Description (Optional)</label>
                        <input type="text" {...register("description")} />
                    </div>

                    <div>
                        <label>Payment Method</label>
                        <select {...register("paymentMethod")}>
                            <option value="cash">Cash</option>
                            <option value="credit">Credit</option>
                            <option value="check">Check</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="bit">Bit</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}
                    </div>

                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                </form>
            ) : (
                <div className={`${styles.transactionItem} ${isPositive(transaction.type) ? styles.expense : styles.income}`}>
                    <div>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div>{transaction.amount}</div>
                    <div>{transaction.category}</div>
                    <div>{transaction.description || 'N/A'}</div>
                    <div>{transaction.paymentMethod}</div>
                    <div className={styles.icon} onClick={handleEdit}>
                        <FaPencilAlt />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TransactionComp;
