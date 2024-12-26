import React from "react";
import styles from "./FixedExpensesManager.module.css";
import { FixedExpense } from "../../../types/types"
import { FixedExpenseCard,FixedExpenseForm } from "../index"
import useUserStore from "@/store/userStore";

interface SlideInFormProps {
    onClose: () => void;
    isVisible: boolean;
}

const FixedExpensesManager: React.FC<SlideInFormProps> = ({ onClose, isVisible }) => {

    const { user } = useUserStore();

    const exampleExpense: FixedExpense = {
        _id: '1',
        name: 'Entertainment',
        amount: 660,
        firstPaymentDate: new Date('2023-01-01'),
        totalInstallments: 12,
        category: 'Leisure',
        paymentMethod: 'credit',
        notes: 'Movies and concerts',
        createdAt: new Date(),
        updatedAt: new Date(),
    };
    return (
        <div className={`${styles.slideInForm} ${isVisible ? styles.open : ""}`}>
            <button className={styles.closeButton} onClick={onClose}>
                סגור ✖
            </button>
            <section>
                {user?.fixedExpenses?.map(exp => (
                    <FixedExpenseCard expense={exp} />
                ))}
            </section>
            <FixedExpenseCard expense={exampleExpense} />
            <FixedExpenseForm/>
        </div>
    );
};

export default FixedExpensesManager;


