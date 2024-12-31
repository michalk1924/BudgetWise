"use server"

import { User, Transaction, FixedExpense } from "../types/types"

export const CreateTransactionByFixedExpense = async (user: User) => {
    try {
        const transactions: Transaction[] = [];
        const today = new Date();

        for (const fixedExpense in user?.fixedExpenses) {
            const expense = user.fixedExpenses[fixedExpense];
            if (expense.firstPaymentDate.getDate() === today.getDate()) {

                const firstPayment = expense.firstPaymentDate;
                const yearsDifference = today.getFullYear() - firstPayment.getFullYear();
                const monthsDifference = today.getMonth() - firstPayment.getMonth();
                const numInstallments = yearsDifference * 12 + monthsDifference;

                if (numInstallments && expense.totalInstallments && numInstallments <= expense.totalInstallments) {
                    const id = crypto.randomUUID();

                    const transaction: Transaction = {
                        _id: id,
                        category: expense.category,
                        type: 'expense',
                        amount: expense.amount,
                        description: expense.notes || "No Description",
                        date: today,
                        createdAt: today,
                        updatedAt: today,
                        paymentMethod: expense.paymentMethod
                    }

                    transactions.push(transaction);
                }
            }
        }

        return transactions;
    } catch (err) {
        console.error("Error creating transaction by fixed expense", err);
    }
}
