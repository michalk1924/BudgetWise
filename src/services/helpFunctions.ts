import { User, Category, Transaction, MonthlyBudget } from '@/types/types';

export const getCategoryIndex = (user: User, categoryName: string): number =>
    user.categories.findIndex((category) => category.categoryName === categoryName);

export const isSameMonth = (date: Date, currentMonth: Date): boolean =>
    new Date(date).getMonth() === currentMonth.getMonth();

export const handleCurrentMonthTransaction = (
    category: Category,
    transaction: Transaction,
    action: "apply" | "revert"
) => {
    const adjustment = action === "apply" ? 1 : -1;
    category.spent =
        (category.spent || 0) +
        adjustment * (transaction.type === "expense" ? transaction.amount : -transaction.amount);
    return category;
};

export const handleDifferentMonthTransaction = (
    category: Category,
    transaction: Transaction,
    action: "apply" | "revert"
) => {
    const monthIndex = getMonthIndex(category.monthlyBudget, transaction.date);
    if (monthIndex === -1) {
        if (action === "apply") {
            category = addMonthlyBudget(category, transaction);
        }
    }

    const adjustment = action === "apply" ? 1 : -1;
    category.monthlyBudget = updateMonthlyBudget(
        category.monthlyBudget!,
        monthIndex,
        adjustment * transaction.amount,
        transaction.type === "expense"
    );
    return category;
};

export const addMonthlyBudget = (category: Category, transaction: Transaction) => {
    if (!category.monthlyBudget) category.monthlyBudget = [];
    category.monthlyBudget.push({
        _id: Math.random().toString(36).substr(2, 9),
        month: transaction.date,
        budget: category.budget,
        spent: transaction.type === "expense" ? transaction.amount : 0,
    });
    return category;
};

export const getMonthIndex = (monthlyBudget: MonthlyBudget[] | undefined, date: Date): number =>
    monthlyBudget?.findIndex(
        (budget) => new Date(budget.month).getMonth() === new Date(date).getMonth()
    ) ?? -1;

export const updateMonthlyBudget = (
    monthlyBudget: MonthlyBudget[],
    monthIndex: number,
    amount: number,
    isExpense: boolean
): MonthlyBudget[] => {
    if (monthIndex === -1) return monthlyBudget;
    const updatedMonth = {
        ...monthlyBudget[monthIndex],
        spent: (monthlyBudget[monthIndex].spent || 0) + (isExpense ? -amount : amount),
    };
    return monthlyBudget.map((month, index) =>
        index === monthIndex ? updatedMonth : month
    );
};

export const updateSavingAfterUpdateTransaction = (transaction: Transaction, prevTransaction: Transaction) => {
    if (transaction.category !== prevTransaction.category) {
        const prevSaving = user?.savings.find((s) => s.goalName === prevTransaction.category);
        const newSaving = user?.savings.find((s) => s.goalName === transaction.category);
        if (prevSaving && newSaving) {
            prevSaving.currentAmount -= prevTransaction.amount;
            updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving: prevSaving });
            newSaving.currentAmount += transaction.amount;
            updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving: newSaving });
        }
    }
    else {
        const saving = user?.savings.find((s) => s.goalName === transaction.category);
        if (saving) {
            saving.currentAmount += transaction.amount - prevTransaction.amount;
            updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving });
        }
    }
}
