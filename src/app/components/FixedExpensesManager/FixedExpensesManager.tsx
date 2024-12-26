import React, { useState } from "react";
import styles from "./FixedExpensesManager.module.css";
import {FixedExpense} from "../../../types/types"
import {FixedExpenseCard} from "../index"

interface SlideInFormProps {
    onClose: () => void;
    isVisible: boolean;
}

const FixedExpensesManager: React.FC<SlideInFormProps> = ({ onClose, isVisible }) => {

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
            <form>
                <h2>טופס הוצאות קבועות</h2>
                <div>
                    <label htmlFor="expenseName">שם ההוצאה:</label>
                    <input type="text" id="expenseName" name="expenseName" />
                </div>
                <div>
                    <label htmlFor="expenseAmount">סכום:</label>
                    <input type="number" id="expenseAmount" name="expenseAmount" />
                </div>
                <button type="submit">שמור</button>
            </form>
            <FixedExpenseCard expense={exampleExpense} />,
        </div>
    );
};

export default FixedExpensesManager;


