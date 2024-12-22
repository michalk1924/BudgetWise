import React, { useState } from "react";
import styles from "./AddNewBudget.module.css";
import { Category } from "@/types/types";

interface AddCategoryProps {
  addCategory: (category: Category) => void;
}

export default function AddNewBudget({ addCategory }: AddCategoryProps) {
  // State to manage the form inputs
  const [formData, setFormData] = useState({
    category: "",
    budget: "",
    description: "",
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
    const { category, budget, description } = formData;

    if (!category || !budget) {
      setError("Please fill in all required fields.");
      return;
    }

    const newCategory: Category = {
      _id: Math.random().toString(36).substr(2, 8),
      type: "general", // Default type
      name: category,
      description: description,
      budget: parseFloat(budget),
      spent:  0,
      month: new Date(), 
    };

    // Call the parent function to add the category
    addCategory(newCategory);

    // Clear the form
    setFormData({ category: "", budget: "", description: "" });
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
          type="text"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="description"
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
      
        {error && <p className={styles.error}>{error}</p>}
        <button onClick={handleSubmit} className={styles.submitButton}>
          Add 
        </button>
      </div>
    </div>
  );
}
