import React, { useState } from "react";
import { FixedExpense } from "../../../types/types";
import styles from "./FixedExpenseCard.module.css";

interface FixedExpenseCardProps {
    expense: FixedExpense;
    onDelete: (expenseId: string) => void;
}

const FixedExpenseCard: React.FC<FixedExpenseCardProps> = ({ expense, onDelete }) => {
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };

    const handleDelete = () => {
        onDelete(expense._id);
    };

    return (
        <div className={styles.fixedExpenseCard}>
            <div className={styles.header}>
                <h3 className={styles.expenseTitle}>{expense.name}</h3>
                <button
                    className={styles.deleteButton}
                    onClick={handleDelete}
                    aria-label="Delete fixed expense"
                >
                    🗑️
                </button>
            </div>
            {!showDetails ? (
                <strong
                    className={styles.toggleText}
                    onClick={toggleDetails}
                >
                    See More{' >>'}
                </strong>
            ) : (
                <>
                    <div className={styles.details}>
                        <p>
                            <strong>Amount:</strong> ${expense.amount.toFixed(2)}
                        </p>
                        <p>
                            <strong>First Payment Date:</strong>{" "}
                            {new Date(expense.firstPaymentDate).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Total Installments:</strong> {expense.totalInstallments}
                        </p>
                        <p>
                            <strong>Category:</strong> {expense.category || "N/A"}
                        </p>
                        <p>
                            <strong>Payment Method:</strong> {expense.paymentMethod || "N/A"}
                        </p>
                        {expense.notes && (
                            <p>
                                <strong>Notes:</strong> {expense.notes}
                            </p>
                        )}
                        <p>
                            <strong>Created At:</strong>{" "}
                            {new Date(expense.createdAt).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Updated At:</strong>{" "}
                            {new Date(expense.updatedAt).toLocaleDateString()}
                        </p>
                    </div>
                    <strong
                        className={styles.toggleText}
                        onClick={toggleDetails}
                    >
                        {'<< '}See Less
                    </strong>
                </>
            )}
        </div>
    );
};

export default FixedExpenseCard;
