import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";
import styles from "./FixedExpenseForm.module.css";

const fixedExpenseSchema = z.object({
    name: z.string().nonempty("Name is required"),
    amount: z.number().min(0, "Amount must be a positive number"),
    firstPaymentDate: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
        return arg;
    }, z.date().refine((date) => !isNaN(date.getTime()), {
        message: "Invalid date",
    })),
    totalInstallments: z.number().int().min(1, "Total installments must be at least 1").optional(),  // כאן הוספתי .optional()
    category: z.string().optional(),
    paymentMethod: z
        .enum(["cash", "credit", "check", "bank_transfer", "bit", "other"])
        .optional(),
    notes: z.string().optional(),
});


type FixedExpense = z.infer<typeof fixedExpenseSchema> & {
    _id: string;
    createdAt: Date;
    updatedAt: Date;
};

const FixedExpenseForm: React.FC = () => {
    const [showForm, setShowForm] = useState(false); // מצב של הצגת הטופס

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FixedExpense>({
        resolver: zodResolver(fixedExpenseSchema),
        defaultValues: {
            name: "",
            amount: 0,
            firstPaymentDate: new Date(),
            totalInstallments: undefined,  // שים לב, הוספתי undefined כדי שהשדה יהיה ריק
            category: "",
            paymentMethod: "other",
            notes: "",
        },
    });


    const queryClient = useQueryClient();
    const { user, addFixedExpense } = useUserStore();

    const updateUserMutation = useMutation({
        mutationFn: async ({ id, fixedExpense }: { id: string; fixedExpense: FixedExpense }) => {
            if (user) {
                const response = await userService.updateUser(id, {
                    fixedExpenses: [...(user?.fixedExpenses || []), fixedExpense],
                });

                addFixedExpense(fixedExpense);
                return response;
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: Error) => {
            console.error("Error updating user:", error.message);
        },
    });

    const onSubmit = (data: FixedExpense) => {
        const newFixedExpense: FixedExpense = {
            ...data,
            firstPaymentDate: new Date(data.firstPaymentDate),
            _id: Math.random().toString(36).substr(2, 8),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        console.log("Expense Details:", newFixedExpense);

        if (user) {
            updateUserMutation.mutate({
                id: user._id,
                fixedExpense: newFixedExpense,
            });
        }

        reset();
    };

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.formTitle} onClick={() => setShowForm(!showForm)}>
                Add Fixed Expense +
            </h2>
            {showForm && (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
                    <div>
                        <label className={styles.label}>Name:</label>
                        <input type="text" {...register("name")} className={styles.input} />
                        {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                    </div>

                    <div>
                        <label className={styles.label}>Amount:</label>
                        <input
                            type="number"
                            step="0.01"
                            {...register("amount", { valueAsNumber: true })}
                            className={styles.input}
                        />
                        {errors.amount && <span className={styles.error}>{errors.amount.message}</span>}
                    </div>

                    <div>
                        <label className={styles.label}>First Payment Date:</label>
                        <input type="date" {...register("firstPaymentDate")} className={styles.input} />
                        {errors.firstPaymentDate && (
                            <span className={styles.error}>{errors.firstPaymentDate.message}</span>
                        )}
                    </div>

                    <div>
                        <label className={styles.label}>Total Installments:</label>
                        <input
                            type="number"
                            {...register("totalInstallments", { valueAsNumber: true })}
                            className={styles.input}
                        />
                        <small className={styles.optionalText}>Optional</small>
                        {errors.totalInstallments && (
                            <span className={styles.error}>{errors.totalInstallments.message}</span>
                        )}
                    </div>


                    <div>
                        <label className={styles.label}>Category:</label>
                        <input type="text" {...register("category")} className={styles.input} />
                    </div>

                    <div>
                        <label className={styles.label}>Payment Method:</label>
                        <select {...register("paymentMethod")} className={styles.input}>
                            <option value="">Select a payment method</option>
                            <option value="cash">Cash</option>
                            <option value="credit">Credit</option>
                            <option value="check">Check</option>
                            <option value="bank_transfer">Bank Transfer</option>
                            <option value="bit">Bit</option>
                            <option value="other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className={styles.label}>Notes:</label>
                        <textarea {...register("notes")} className={styles.input} />
                    </div>

                    <button type="submit" disabled={isSubmitting} className={styles.button}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default FixedExpenseForm;
