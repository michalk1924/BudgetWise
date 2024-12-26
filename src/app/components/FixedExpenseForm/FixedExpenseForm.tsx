import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";

const fixedExpenseSchema = z.object({
    name: z.string().nonempty("Name is required"),
    amount: z.number().min(0, "Amount must be a positive number"),
    firstPaymentDate: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg); // ממיר את המחרוזת ל-Date
        }
        return arg;
    }, z.date().max(new Date(), "Date must be before today")), // שימוש ב-z.date
    totalInstallments: z.number().int().min(1, "Total installments must be at least 1"),
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

const FixedExpenseForm = () => {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FixedExpense>({
        resolver: zodResolver(fixedExpenseSchema),
        defaultValues: {
            name: "",
            amount: 0,
            firstPaymentDate: new Date(),
            totalInstallments: 1,
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
                    fixedExpenses: [...user?.fixedExpenses || [], fixedExpense],
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
            firstPaymentDate: new Date(data.firstPaymentDate), // המרה ל- Date
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
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div>
                <label>Name:</label>
                <input type="text" {...register("name")} />
                {errors.name && <span className="error">{errors.name.message}</span>}
            </div>

            <div>
                <label>Amount:</label>
                <input type="number" step="0.01" {...register("amount", { valueAsNumber: true })} />
                {errors.amount && <span className="error">{errors.amount.message}</span>}
            </div>

            <div>
                <label>First Payment Date:</label>
                <input type="date" {...register("firstPaymentDate")} />
                {errors.firstPaymentDate && <span className="error">{errors.firstPaymentDate.message}</span>}
            </div>

            <div>
                <label>Total Installments:</label>
                <input type="number" {...register("totalInstallments", { valueAsNumber: true })} />
                {errors.totalInstallments && <span className="error">{errors.totalInstallments.message}</span>}
            </div>

            <div>
                <label>Category:</label>
                <input type="text" {...register("category")} />
            </div>

            <div>
                <label>Payment Method:</label>
                <select {...register("paymentMethod")}>
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
                <label>Notes:</label>
                <textarea {...register("notes")} />
            </div>

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default FixedExpenseForm;