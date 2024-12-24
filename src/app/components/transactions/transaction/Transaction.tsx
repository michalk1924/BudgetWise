"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import styles from "./TransactionComp.module.css";
import { Transaction, Category } from "../../../../types/types";
import { FaPencilAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";


const transactionSchema = z.object({
    category: z.string().optional(),
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

const TransactionComp = ({ transaction, updateTransaction, categories }: { transaction: Transaction, categories: Category[], updateTransaction: (transaction: Transaction) => void }) => {

    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TransactionInput>({
        resolver: zodResolver(transactionSchema),
        defaultValues: {
            date: transaction.date instanceof Date
                ? transaction.date.toISOString().split('T')[0]
                : new Date(transaction.date).toISOString().split('T')[0],
            amount: transaction.amount,
            description: transaction.description || "",
            paymentMethod: transaction.paymentMethod || "cash",
        },
    });

    const onSubmit: SubmitHandler<TransactionInput> = async (data) => {

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
                <div className={`${styles.transactionItem} ${styles[transaction.type]}`}>
                    <div>
                        <input
                            type="date"
                            {...register("date")}
                            className={styles.inlineInput}
                        />
                        {errors.date && <p className={styles.error}>{errors.date.message}</p>}
                    </div>
                    <div>
                        <input
                            type="number"
                            placeholder="Amount"
                            {...register("amount", { valueAsNumber: true })}
                            className={styles.inlineInput}
                        />
                        {errors.amount && <p className={styles.error}>{errors.amount.message}</p>}
                    </div>

                    <div className={styles.hiddenOnSmall}>
                        <select
                            {...register("category")}
                            className={styles.inlineSelect}
                            defaultValue={transaction.category || ""}
                        >
                            {categories.map((category) => (
                                <option key={category._id} value={category.categoryName}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        {errors.category && (
                            <p className={styles.error}>{errors.category.message}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Description"
                            {...register("description")}
                            className={styles.inlineInput}
                        />
                    </div>

                    <div className={styles.hiddenOnSmall}>
                        <select {...register("paymentMethod")} className={styles.inlineSelect}>
                            <option value="cash">Cash</option>
                            <option value="credit">Credit</option>
                            <option value="check">Check</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="bit">Bit</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.paymentMethod && <p className={styles.error}>{errors.paymentMethod.message}</p>}
                    </div>

                    <div className={styles.actions}>
                        <button type="button" onClick={handleSubmit(onSubmit)} className={styles.inlineButton}>
                            <FiSave />
                        </button>
                    </div>

                </div>
            ) : (
                <div className={`${styles.transactionItem} ${styles[transaction.type]}`}>
                    <div>{new Date(transaction.date).toLocaleDateString()}</div>
                    <div>{transaction.amount}</div>
                    <div>{transaction.category}</div>
                    <div className={styles.hiddenOnSmall}>{transaction.description || 'N/A'}</div>
                    <div className={styles.hiddenOnSmall}>{transaction.paymentMethod}</div>
                    <div className={styles.icon} onClick={handleEdit}>
                        <FaPencilAlt />
                    </div>
                </div>
            )}

        </div>
    );
};

export default TransactionComp;
