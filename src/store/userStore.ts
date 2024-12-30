"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Category, Saving, Transaction, Alert, Recommendation, FixedExpense} from "../types/types";
import { saveToken } from "@/services/cookies";


interface UserStore {
  user: User | null;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setUser: (user: User) => void;
  clearUser: () => void;
  addCategory: (category: Category) => void;
  initCategories: (categories: Category[]) => void;
  updateCategory: (updatedCategory: Category) => void;
  removeCategory: (categoryId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  addTransactionsFromExcel: (transactions: Transaction[]) => void;
  updateTransaction: (transaction: Transaction) => void;
  removeTransaction: (transactionId: string) => void;
  addSaving: (saving: Saving) => void;
  updateSaving: (saving: Saving) => void;
  removeSaving:(savingId: String) => void;
  setAlerts: (alerts: Alert[]) => void;
  addAlert: (alert: Alert) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  updateAlertStatus: (alertId: string, isActive: boolean) => void;
  removeAlert: (alertId: string) => void;
  addFixedExpense: (fixedExpense: FixedExpense) => void;
  removeFixedExpense: (fixedExpenseId: string) => void;
  expirationTimestamp?: number;

}

const useUserStore = create<UserStore>()(
  persist(

    (set) => ({
      user: null,
      loading: false,
      setLoading: (loading) => set({ loading }),

      setUser: async (user: User) => {
        set({ loading: true });
        const userWithExpiration = {
          ...user,
          expirationTimestamp: Date.now() + 60 * 60 * 1000 * 12,
        };
        set({ user: userWithExpiration, loading: false });
      },

      clearUser: () => {
        set({ user: null });
        saveToken("");
      },

      addCategory: (category) =>
        set((state) => ({
          user: {
            ...state.user!,
            categories: [...state.user!.categories, category],
          },
        })),

      initCategories: (categories) =>
        set((state) => ({
          user: {
            ...state.user!,
            categories: categories,
          },
        })),

      updateCategory: (updatedCategory) =>
        set((state) => ({
          user: {
            ...state.user!,
            categories: state.user!.categories.map((cat) =>
              cat._id === updatedCategory._id ? { ...cat, ...updatedCategory } : cat
            ),
          },
        })),

      removeCategory: (categoryId) =>
        set((state) => ({
          user: {
            ...state.user!,
            categories: state.user!.categories.filter((cat) => cat._id !== categoryId),
          },
        })),

      addTransaction: (transaction) =>
        set((state) => ({
          user: {
            ...state.user!,
            transactions: [...state.user!.transactions, transaction],
          },
        })),

        addTransactionsFromExcel: (transactionsFromExcel: Transaction[]) =>
          set((state) => ({
            user: {
              ...state.user!,
              transactions: [...state.user!.transactions, ...transactionsFromExcel],
            },
          })),

      updateTransaction: (transaction) =>
        set((state) => ({
          user: {
            ...state.user!,
            transactions: state.user!.transactions.map((t) =>
              t._id === transaction._id ? { ...t, ...transaction } : t
            ),
          },
        })),

      removeTransaction: (transactionId) =>
        set((state) => ({
          user: {
            ...state.user!,
            transactions: state.user!.transactions.filter((t) => t._id !== transactionId),
          },
        })),

      addSaving: (saving) =>
        set((state) => ({
          user: {
            ...state.user!,
            savings: [...state.user!.savings, saving],
          },
        })),
      updateSaving: (updatedSaving) =>
        set((state) => ({
          user: {
            ...state.user!,
            savings: state.user!.savings.map((cat) =>
              cat._id === updatedSaving._id ? { ...cat, ...updatedSaving } : cat
            ),
          },
        })),

        removeSaving: (savingId) =>
          set((state) => ({
            user: {
              ...state.user!,
              savings: state.user!.savings.filter((cat) => cat._id !== savingId),
            },
          })),
      setAlerts: (alerts) =>
        set((state) => ({
          user: {
            ...state.user!,
            alerts,
          },
        })),

      addAlert: (alert) =>
        set((state) => ({
          user: {
            ...state.user!,
            alerts: [...state.user!.alerts, alert],
          },
        })),

      updateAlertStatus: (alertId: string, isActive: boolean) =>
        set((state) => ({
          user: {
            ...state.user!,
            alerts: state.user!.alerts.map((alert) =>
              alert.alertId === alertId ? { ...alert, isActive: isActive } : alert
            ),
          },
        })),

      removeAlert: (alertId) =>
        set((state) => ({
          user: {
            ...state.user!,
            alerts: state.user!.alerts.filter((alert) => alert.alertId !== alertId),
          },
        })),

        addFixedExpense: (fixedExpense) =>
          set((state) => ({
            user: {
              ...state.user!,
              fixedExpenses: [...state.user!.fixedExpenses, fixedExpense],
            },
          })),

          removeFixedExpense: (fixedExpenseId) =>
            set((state) => ({
              user: {
                ...state.user!,
                fixedExpenses: state.user!.fixedExpenses.filter((fixedExpense) => fixedExpense._id !== fixedExpenseId),
              },
            })),


      setRecommendations: (recommendations) =>
        set((state) => ({
          user: {
            ...state.user!,
            recommendations,
          },
        })),
    }),

    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: (state) => {
        if (state?.expirationTimestamp && Date.now() > state.expirationTimestamp) {
          state.user = null;
        }
      },
    }
  )
);

export default useUserStore;
