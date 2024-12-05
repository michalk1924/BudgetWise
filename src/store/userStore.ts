"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, UserCategory, Saving, Transaction, Alert, Recommendation } from "../types/types";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  addCategory: (category: UserCategory) => void;
  updateCategory: (categoryId: string, updatedCategory: Partial<UserCategory>) => void;
  removeCategory: (categoryId: string) => void;
  addTransaction: (transaction: Transaction) => void;
  addSaving: (saving: Saving) => void;
  setAlerts: (alerts: Alert[]) => void;
  setRecommendations: (recommendations: Recommendation[]) => void;
  expirationTimestamp?: number;
}

const useUserStore = create<UserStore>()(
  persist(

    (set) => ({
      user: null,

      setUser: (user: User) => {
        const userWithExpiration = {
          ...user,
          expirationTimestamp: Date.now() + 24 * 60 * 60 * 1000, // expires in 24 hours
        };
        set({ user: userWithExpiration });
      },

      clearUser: () => set({ user: null }),

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
