import React, { useState } from "react";
import styles from "./AddNewBudget.module.css";
import { UserCategory } from "@/types/types";

interface AddCategoryProps {
  addCategory: (category: UserCategory) => void;
}

// =====================
// TODO: Use a form library like Formik or React Hook Form, or at least <form> element

export default function AddNewBudget({ addCategory }: AddCategoryProps) {
  // State to manage the form inputs
  const [formData, setFormData] = useState({
    category: "",
    budget: "",
    spent: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = () => {
    const { category, budget, spent } = formData;

    if (!category || !budget) {
      setError("Please fill in all required fields.");
      return;
    }

    const newCategory: UserCategory = {
      _id: Math.random().toString(36).substr(2, 8),
      userId: "user123", // Replace with dynamic user ID if needed
      type: "general", // Default type
      name: category,
      description: "Custom category",
      budget: parseFloat(budget),
      spent: parseFloat(spent) || 0,
      month: new Date(), // Assign current month
    };

    // Call the parent function to add the category
    addCategory(newCategory);

    // Clear the form
    setFormData({ category: "", budget: "", spent: "" });
    setError(null);
  };

  return (
    <div className={styles.addBudgetContainer}>
      <h3 className={styles.addBudgetTitle}>Add New Budget:</h3>
      <div className={styles.form}>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className={styles.input}
        />
        <input
          type="number"
          name="budget"
          value={formData.budget}
          onChange={handleInputChange}
          placeholder="Budget"
          className={styles.input}
        />
        <input
          type="number"
          name="spent"
          value={formData.spent}
          onChange={handleInputChange}
          placeholder="Already Spent"
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleSubmit} className={styles.submitButton}>
          Add 
        </button>
      </div>
    </div>
  );
}
