import React from "react";
import styles from "./FixedExpensesManager.module.css";
import { FixedExpenseCard, FixedExpenseForm, HorizontalBarChart } from "../index";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";

interface SlideInFormProps {
    onClose: () => void;
    isVisible: boolean;
}

const FixedExpensesManager: React.FC<SlideInFormProps> = ({ onClose, isVisible }) => {
    const { user } = useUserStore();
    const queryClient = useQueryClient();
    const removeFixedExpense = useUserStore((state) => state.removeFixedExpense);

    const deleteFixedExpensesMutation = useMutation({
        mutationFn: async ({ userId, fixedExpenseId }: { userId: string; fixedExpenseId: string }) => {
            if (user) {
                const updatedFixedExpenses = user.fixedExpenses.filter(
                    (fixedExpense) => fixedExpense._id !== fixedExpenseId
                );
                return await userService.updateUser(userId, { fixedExpenses: updatedFixedExpenses });
            }
            return null;
        },
        onSuccess: (_, { fixedExpenseId }) => {
            removeFixedExpense(fixedExpenseId);
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: Error) => {
            console.error("Error deleting fixed expense:", error.message);
        },
    });


    const handleDelete = (fixedExpenseId: string) => {
        if (user) {
            deleteFixedExpensesMutation.mutate({
                userId: user._id,
                fixedExpenseId,
            });
        }
    };


    return (
        <div className={`${styles.slideInForm} ${isVisible ? styles.open : ""}`}>
            <button className={styles.closeButton} onClick={onClose}>
                X
            </button>
            <div className={styles.content}>
                <h2 className={styles.title}>Manage Your Fixed Expenses</h2>
                <section className={styles.fixedExpensesSection}>
                    {user?.fixedExpenses?.map((exp) => (
                        <FixedExpenseCard
                            expense={exp}
                            key={exp._id}
                            onDelete={handleDelete}
                        />
                    ))}
                </section>
                <FixedExpenseForm />
                </div>
        </div>
    );
};

export default FixedExpensesManager;
