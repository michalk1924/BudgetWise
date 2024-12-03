import { create } from "zustand";

const useUserStore = create((set) => ({
  // User State
  user: {
    username: "",
    email: "",
    categories: [],
    savings: [],
    transactions: [],
    alerts: [],
    recommendations: [],
  },

  // Actions to Modify State
  setUser: (userData) => set({ user: { ...userData } }),
    setCategories: (categories) => set({ categories }),
    setTransactions: (transactions) => set({ transactions }),
    setSavings: (savings) => set({ savings }),
    setAlerts: (alerts) => set({ alerts }),
    setRecommendations: (recommendations) => set({ recommendations }),

    toggleModal: (modalName) =>
      set((state) => ({
        ui: { ...state.ui, [modalName]: !state.ui[modalName] },
      })),
  
  
  addCategory: (category) =>
    set((state) => ({
      user: {
        ...state.user,
        categories: [...state.user.categories, category],
      },
    })),

  updateCategory: (index, updatedCategory) =>
    set((state) => {
      const updatedCategories = [...state.user.categories];
      updatedCategories[index] = updatedCategory;
      return {
        user: {
          ...state.user,
          categories: updatedCategories,
        },
      };
    }),

  removeCategory: (index) =>
    set((state) => ({
      user: {
        ...state.user,
        categories: state.user.categories.filter((_, i) => i !== index),
      },
    })),

  addTransaction: (transaction) =>
    set((state) => ({
      user: {
        ...state.user,
        transactions: [...state.user.transactions, transaction],
      },
    })),

  addSaving: (saving) =>
    set((state) => ({
      user: {
        ...state.user,
        savings: [...state.user.savings, saving],
      },
    })),
}));
export default useUserStore;
