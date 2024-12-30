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

    // חישוב מספר התשלומים שנשארו
    const calculateRemainingInstallments = () => {
        if (!expense.totalInstallments || !expense.firstPaymentDate) return 0;

        const today = new Date();
        const firstPaymentDate = new Date(expense.firstPaymentDate);

        const yearsDifference = today.getFullYear() - firstPaymentDate.getFullYear();
        const monthsDifference = today.getMonth() - firstPaymentDate.getMonth();
        const monthsPassed = yearsDifference * 12 + monthsDifference;

        const remainingInstallments = expense.totalInstallments - monthsPassed;
        return remainingInstallments;
    };

    const remainingInstallments = calculateRemainingInstallments();

    const isInvalidExpense = remainingInstallments < 0;

    return (
        <div
            className={styles.fixedExpenseCard}
            style={isInvalidExpense ? { backgroundColor: '#D3D3D3' } : {}}
        >
            {isInvalidExpense && (
                <div className={styles.invalidExpenseHeader}>
                    <h3 className={styles.invalidTitle}>Expenditure not valid</h3>
                </div>
            )}

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
                            <strong>Remaining Installments:</strong> {remainingInstallments > 0 ? remainingInstallments : 0}
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
