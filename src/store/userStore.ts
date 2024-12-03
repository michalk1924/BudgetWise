// src/store/userStore.ts
import { create } from "zustand";
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
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
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
}));

export default useUserStore;
