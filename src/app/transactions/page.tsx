"use client"

import React, { useState } from 'react';
import styles from "./transactions.module.css";
import { AddTransaction, TransactionTable, UploadExcel, FixedExpensesManager } from '../components/index';
import { Transaction, Saving, Category, User, MonthlyBudget } from '../../types/types';
import useUserStore from "../../store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from '@/services/user';

function Transactions() {

  const { user, addTransaction, updateTransaction, updateSaving, updateCategory, removeTransaction, loading } = useUserStore();

  const queryClient = useQueryClient();

  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(true);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const closeForm = () => setIsFormVisible(false);

  const updateUserMutationAddTransaction = useMutation({
    mutationFn: async ({ id, transaction }: { id: string; transaction: Transaction }) => {
      if (user) {

        try {
          addTransaction(transaction);
          const response = await userService.updateUser(id, { transactions: [...user?.transactions, transaction] });
        } catch (error) {
          console.error('Error updating user:', error);
          removeTransaction(transaction._id);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error.message);
    },
  });

  const updateUserMutationUpdateTransaction = useMutation({
    mutationFn: async ({ id, transaction }: { id: string; transaction: Transaction }) => {
      if (user) {
        const prevTransaction = user.transactions.find(t => t._id === transaction._id);
        if (!prevTransaction) return;
        try {
          updateTransaction(transaction);
          const response = await userService.updateUser(id, { transactions: user?.transactions.map((t) => t._id === transaction._id ? transaction : t) });
          return response;
        }
        catch (error) {
          console.error('Error updating user:', error);
          updateTransaction(prevTransaction);
        }
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error.message);
    },
  });

  const updateUserMutationUpdateSaving = useMutation({
    mutationFn: async ({ id, saving }: { id: string; saving: Saving }) => {
      if (user) {
        const response = await userService.updateUser(id, { savings: user?.savings.map((c) => c._id === saving._id ? saving : c) });
        updateSaving(saving);
        return response;
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error.message);
    },
  });

  const updateUserMutationUpdateCategory = useMutation({
    mutationFn: async ({ id, category }: { id: string; category: Category }) => {
      if (user) {
        const response = await userService.updateUser(id, { categories: user?.categories.map((c) => c._id === category._id ? category : c) });
        updateCategory(category);
        return response;
      }
      return null;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
    onError: (error: Error) => {
      console.error('Error updating user:', error.message);
    },
  });

  const handleAddTransaction = async (transaction: Transaction) => {

    transaction._id = Math.random().toString(36).substr(2, 8);

    if (transaction?.type == 'saved') {
      let saving = user?.savings.find((s) => s.goalName === transaction.category)
      if (saving && typeof saving.currentAmount === "number") {
        saving.currentAmount += transaction.amount;
        updateUserMutationUpdateSaving.mutate({ id: user?._id ?? '', saving });
      }
    }

    else {
      try {
        if (user) {
          const category = updateCategoryAfterAddTransaction(user, transaction);

          if (category) {
            updateUserMutationUpdateCategory.mutate({ id: user?._id ?? '', category });
          }
        }
      }
      catch (error) {
        console.error('Error updating category:', error);
      }
    }

    updateUserMutationAddTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  const handleUpdateTransaction = (transaction: Transaction) => {

    const prevTransaction = user?.transactions.find(
      (t) => t._id === transaction._id
    )

    if (prevTransaction && transaction.type === 'saved') {
      updateSavingAfterUpdateTransaction(transaction, prevTransaction);
    }

    if (transaction.type == 'expense' || transaction.type == 'income') {

      if (user && prevTransaction) {
        updateCategoryAfterUpdateTransaction(user, prevTransaction, transaction);
      }
    }

    updateUserMutationUpdateTransaction.mutate({ id: user?._id ?? '', transaction });
  }

  const updateCategoryAfterAddTransaction = (user: User, transaction: Transaction): Category | undefined => {
    const currentMonth = new Date();
    if (!transaction.category) {
      console.error("Category not found");
      return undefined;
    }
    const categoryIndex = getCategoryIndex(user, transaction.category);

    if (categoryIndex === -1) {
      console.error("Category not found");
      return undefined;
    }

    let category = { ...user.categories[categoryIndex] };

    if (isSameMonth(transaction.date, currentMonth)) {
      category = handleCurrentMonthTransaction(category, transaction, "apply");
    } else {
      category = handleDifferentMonthTransaction(category, transaction, "apply");
    }

    return category;
  };

  const updateCategoryAfterUpdateTransaction = (
    user: User,
    prevTransaction: Transaction,
    updatedTransaction: Transaction
  ) => {
    try {
      console.log("Updating category after update transaction");

      if (!prevTransaction.category || !updatedTransaction.category) {
        console.error("Previous or updated category not found");
        return;
      }

      const currentMonth = new Date();
      const categoryIndex = getCategoryIndex(user, updatedTransaction.category);

      if (categoryIndex === -1) {
        console.error("Category not found");
        return;
      }

      let category: Category = { ...user.categories[categoryIndex] };

      if (prevTransaction.category === updatedTransaction.category) {

        if (isSameMonth(prevTransaction.date, currentMonth)) {
          const adjustment = updatedTransaction.amount - prevTransaction.amount;
          category.spent += updatedTransaction.type === "expense" ? adjustment : -adjustment;

          updateUserMutationUpdateCategory.mutate({ id: user?._id ?? "", category });
        } else {

          category = handleDifferentMonthTransaction(category, prevTransaction, "revert");
          category = handleDifferentMonthTransaction(category, updatedTransaction, "apply");

          updateUserMutationUpdateCategory.mutate({ id: user?._id ?? "", category });
        }
      } else {
        const prevCategoryIndex = getCategoryIndex(user, prevTransaction.category);
        const updatedCategoryIndex = getCategoryIndex(user, updatedTransaction.category);

        if (prevCategoryIndex === -1 || updatedCategoryIndex === -1) {
          console.error("Category not found");
          return;
        }

        let prevCategory: Category = { ...user.categories[prevCategoryIndex] };
        let updatedCategory: Category = { ...user.categories[updatedCategoryIndex] };

        if (isSameMonth(prevTransaction.date, currentMonth)) {
          prevCategory = handleCurrentMonthTransaction(prevCategory, prevTransaction, "revert");
          updatedCategory = handleCurrentMonthTransaction(updatedCategory, updatedTransaction, "apply");
        } else {
          prevCategory = handleDifferentMonthTransaction(prevCategory, prevTransaction, "revert");
          updatedCategory = handleDifferentMonthTransaction(updatedCategory, updatedTransaction, "apply");
        }

        updateUserMutationUpdateCategory.mutate({ id: user?._id ?? '', category: prevCategory });
        updateUserMutationUpdateCategory.mutate({ id: user?._id ?? "", category: updatedCategory });
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const getCategoryIndex = (user: User, categoryName: string): number =>
    user.categories.findIndex((category) => category.categoryName === categoryName);

  const isSameMonth = (date: Date, currentMonth: Date): boolean =>
    new Date(date).getMonth() === currentMonth.getMonth();

  const handleCurrentMonthTransaction = (
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

  const handleDifferentMonthTransaction = (
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

  const addMonthlyBudget = (category: Category, transaction: Transaction) => {
    if (!category.monthlyBudget) category.monthlyBudget = [];
    category.monthlyBudget.push({
      _id: Math.random().toString(36).substr(2, 9),
      month: transaction.date,
      budget: category.budget,
      spent: transaction.type === "expense" ? transaction.amount : 0,
    });
    return category;
  };

  const getMonthIndex = (monthlyBudget: MonthlyBudget[] | undefined, date: Date): number =>
    monthlyBudget?.findIndex(
      (budget) => new Date(budget.month).getMonth() === new Date(date).getMonth()
    ) ?? -1;

  const updateMonthlyBudget = (
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

  const updateSavingAfterUpdateTransaction = (transaction: Transaction, prevTransaction: Transaction) => {
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

  return (
    <div className={styles.container}>
      {!loading && user && (
        <div className={styles.headers}>
          <h2 className={styles.title}>Manage My Transactions</h2>
          {user && (
            <div className={styles.total}>
              <div>
                Total:{" "}
                {user?.transactions
                  ?.reduce((amount, t) => {
                    if (t.type === "expense") {
                      return amount - Number(t.amount || 0);
                    }
                    return amount + Number(t.amount || 0);
                  }, 0)
                  .toFixed(2)}
                $
              </div>
              <div className={styles.currentMonthBalance}>
                (Current Month Balance:{" "}
                {user?.transactions
                  ?.filter((transaction) => {
                    const transactionDate = new Date(transaction.date);
                    const now = new Date();
                    return (
                      transactionDate.getMonth() === now.getMonth() &&
                      transactionDate.getFullYear() === now.getFullYear()
                    );
                  })
                  .reduce((amount, t) => {
                    if (t.type === "expense") {
                      return amount - Number(t.amount || 0);
                    }
                    return amount + Number(t.amount || 0);
                  }, 0)
                  .toFixed(2)}
                $)
              </div>
              <button onClick={togglePopup} className={styles.manageFixedTransaction}>Management of fixed expenses</button>

            </div>
          )}
        </div>
      )}

      {!loading && user && <div className={styles.main}>

        <div className={styles.addSection}>
          <div>
            {isPopupOpen && (
              <FixedExpensesManager onClose={togglePopup} isVisible={isFormVisible} />
            )}
          </div>
          {/*           <UploadExcel />*/}
        </div>

        {user && user?.transactions?.length > 0 && <TransactionTable transactions={user?.transactions}
          updateTransaction={handleUpdateTransaction} addTransaction={handleAddTransaction} categories={user?.categories}
          savingsNames={user?.savings.map(s => s.goalName)}
        />}

      </div>}

      {loading && <div className={styles.loader}>Loading...</div>}

      {!loading && user && user?.transactions?.length === 0 && <div>
        No transactions found. Add some today!
      </div>}

      {!loading && !user && <div className={styles.loader}>
        {/* Please log in to access this feature. */}
      </div>}
      
    </div>
  )
}
export default Transactions;