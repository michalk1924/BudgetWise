"use server"

import { User, Transaction, FixedExpense } from "../types/types"

export const CreateTransactionByFixedExpense = async (user: User) => {

    try {

        const transactions: Transaction[] = [];
        const today = new Date();
        for (const fixedExpense in user?.fixedExpenses) {
            if (user.fixedExpenses[fixedExpense].firstPaymentDate.getDate() === today.getDate()) {

                const firstPayment=user.fixedExpenses[fixedExpense].firstPaymentDate;
                const yearsDifference = today.getFullYear() - firstPayment.getFullYear();
                const monthsDifference = today.getMonth() - firstPayment.getMonth();
                const numInstallments =yearsDifference * 12 + monthsDifference;

                if (numInstallments <= user.fixedExpenses[fixedExpense].totalInstallments) {

                    const id = crypto.randomUUID();

                    const transaction: Transaction = {
                        _id: id,
                        category: user.fixedExpenses[fixedExpense].category,
                        type: 'expense',
                        amount: user.fixedExpenses[fixedExpense].amount,
                        description: user.fixedExpenses[fixedExpense].notes || "No Description",
                        date: today,
                        createdAt: today,
                        updatedAt: today,
                        paymentMethod: user.fixedExpenses[fixedExpense].paymentMethod
                    }

                    transactions.push(transaction);
                };
            }
        }

        return transactions;

    } catch (err) {
        console.error("Error creating transaction by fixed expense", err);
    }

}