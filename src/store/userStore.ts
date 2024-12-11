"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Category, Saving, Transaction, Alert, Recommendation } from "../types/types";
import { saveToken } from "@/services/cookies";


interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addCategory: (category: Category) => void;
  updateCategory: (categoryId: string, updatedCategory: Partial<Category>) => void;
  removeCategory: (categoryId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  addSaving: (saving: Saving) => void;
  setAlerts: (alerts: Alert[]) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  updateAlertStatus: (alertId: string, isActive: boolean) => void;
  removeAlert: (alertId: string) => void;
  expirationTimestamp?: number;
}

const useUserStore = create<UserStore>()(
  persist(

    (set) => ({
      user: null,
      setUser: (user: User) => {
        const userWithExpiration = {
          ...user,
          expirationTimestamp: Date.now() + 60 * 60 * 1000,
        };
        set({ user: userWithExpiration });
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

      updateCategory: (categoryId, updatedCategory) =>
        set((state) => ({
          user: {
            ...state.user!,
            categories: state.user!.categories.map((cat) =>
              cat._id === categoryId ? { ...cat, ...updatedCategory } : cat
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

      addSaving: (saving) =>
        set((state) => ({
          user: {
            ...state.user!,
            savings: [...state.user!.savings, saving],
          },
        })),

      setAlerts: (alerts) =>
        set((state) => ({
          user: {
            ...state.user!,
            alerts,
          },
        })),

      updateAlertStatus: (alertId: string, isActive: boolean) =>
        set((state) => ({
          user: {
            ...state.user!,
            alerts: state.user!.alerts.map((alert) =>
              alert.alertId === alertId ? { ...alert, isActive:isActive } : alert
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
      storage: createJSONStorage(() => sessionStorage),

      onRehydrateStorage: (state) => {
        if (state?.expirationTimestamp && Date.now() > state.expirationTimestamp) {
          state.user = null;
        }
      },
    }
  )
);

export default useUserStore;
