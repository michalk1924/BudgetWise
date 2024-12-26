import React from "react";
import {FixedExpense} from "../../../types/types"

interface FixedExpenseCardProps {
    expense: FixedExpense;
}

const FixedExpenseCard: React.FC<FixedExpenseCardProps> = ({ expense }) => {
    return (
        <div style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px", margin: "10px", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9" }}>
            <h3 style={{ marginBottom: "8px" }}>{expense.name}</h3>
            <p><strong>Amount:</strong> ${expense.amount.toFixed(2)}</p>
            <p><strong>First Payment Date:</strong> {new Date(expense.firstPaymentDate).toLocaleDateString()}</p>
            <p><strong>Total Installments:</strong> {expense.totalInstallments}</p>
            <p><strong>Category:</strong> {expense.category || "N/A"}</p>
            <p><strong>Payment Method:</strong> {expense.paymentMethod || "N/A"}</p>
            {expense.notes && <p><strong>Notes:</strong> {expense.notes}</p>}
            <p><strong>Created At:</strong> {new Date(expense.createdAt).toLocaleDateString()}</p>
            <p><strong>Updated At:</strong> {new Date(expense.updatedAt).toLocaleDateString()}</p>
        </div>
    );
};

export default FixedExpenseCard;
