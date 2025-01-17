"use client";

import React, { useState } from "react";
import styles from "./userDetailsForm.module.css";
import { generateBudgetWithCategories } from "@/services/budgetCalc";
import { Category, Saving, FixedExpense } from "@/types/types";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";
import { showSuccessAlert, showErrorAlert } from "../../services/alerts";
import { useRouter } from "next/navigation";

interface FormData {
    fullName: string;
    email: string;
    startBudgetMonth: string;
    estimatedIncome: number;
    incomeSources: "salary" | "business" | "investments" | "other" | "";
    loans: "yes" | "no" | "";
    debts: "yes" | "no" | "";
    savings: string;
    emergencyFund: "yes" | "no" | "";
    emergencyFundAmount: number,
    budgetPriority: "avoidOverspending" | "increaseSavings" | "investLongTerm" | "improveQualityOfLife" | "";
    transportation: string;
    housing: string;
    housingCost: number;
    dependents: number;
    educationCost: number;
    hasCar: "yes" | "no" | "";
    numberOfCars: number;
    entertainmentPreference: "low" | "medium" | "high" | "";
    householdType: "single" | "partnered" | "";
}

const UserDetailsForm = () => {
    const [fixedExpenses, setFixedExpenses] = useState<FixedExpense[]>([]);

    const { user, initCategories, initFixedExpenses, addSaving } = useUserStore();

    const queryClient = useQueryClient();
    const router = useRouter();

    const updateUserAddCategoriesMutation = useMutation({
        mutationFn: async ({
            id,
            categories,
        }: {
            id: string;
            categories: Category[];
        }) => {
            if (user) {
                const response = await userService.updateUser(id, {
                    categories: categories,
                });
                initCategories(categories);
                return response;
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: Error) => {
            console.error("Error updating user:", error.message);
        },
    });

    const updateUserAddFixedExpensesMutation = useMutation({
        mutationFn: async ({ id, fixedExpenses }: { id: string; fixedExpenses: FixedExpense[] }) => {
            if (user) {
                const response = await userService.updateUser(id, {
                    fixedExpenses,
                });

                initFixedExpenses(fixedExpenses);
                return response;
            }
            return null;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (error: Error) => {
            console.error("Error updating user:", error.message);
        },
    });

    const updateUserAddSavingMutation = useMutation({
        mutationFn: async ({ id, saving }: { id: string; saving: Saving }) => {
            if (user) {
                const response = await userService.updateUser(id, { savings: [...user?.savings, saving] });
                addSaving(saving);
                return response;
            }
            return null;
        },
        onSuccess: () => {

            queryClient.invalidateQueries({ queryKey: ['users'] });
            router.push('/home');
        },
        onError: (error: Error) => {
            console.error('Error updating user:', error.message);
        },
    });

    const [formData, setFormData] = useState<FormData>({
        fullName: user?.username || "",
        email: user?.email || "",
        startBudgetMonth: "",
        estimatedIncome: 0,
        incomeSources: "",
        loans: "",
        debts: "",
        savings: "",
        emergencyFund: "",
        emergencyFundAmount: 0,
        budgetPriority: "",
        transportation: "",
        housing: "",
        housingCost: 0,
        dependents: 0,
        educationCost: 0,
        hasCar: "",
        numberOfCars: 0,
        entertainmentPreference: "",
        householdType: "",
    });

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFixedExpenseChange = (
        id: string,
        field: keyof FixedExpense,
        value: string | number
    ) => {
        setFixedExpenses((prevExpenses) =>
            prevExpenses.map((expense) =>
                expense._id === id ? { ...expense, [field]: value } : expense
            )
        );
    };

    const addFixedExpense = () => {
        const newExpense: FixedExpense = {
            _id: Math.random().toString(36).substr(2, 8),
            name: "",
            amount: 0,
            firstPaymentDate: new Date(),
            totalInstallments: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        setFixedExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    };

    const removeFixedExpense = (id: string) => {
        setFixedExpenses((prevExpenses) =>
            prevExpenses.filter((expense) => expense._id !== id)
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const budget = generateBudgetWithCategories(formData);

        const categories: Category[] = Object.entries(budget.expenses).map(
            ([categoryName, budgetAmount]) => ({
                _id: Math.random().toString(36).substr(2, 8),
                categoryName,
                description: categoryName,
                budget: Number(budgetAmount),
                spent: 0,
                monthlyBudget: [],
            })
        );

        categories.push(
            {
                _id: Math.random().toString(36).substr(2, 8),
                categoryName: "general",
                description: "General category for general transactions",
                budget: 10000,
                spent: 0,
                monthlyBudget: [],
            }
        )

        const saving: Saving = {
            _id: Math.random().toString(36).substr(2, 8),
            goalName: "Emergency Fund",
            targetAmount: 20000,
            currentAmount: formData.emergencyFundAmount,
            deadline: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const updatedExpenses: FixedExpense[] = [
            ...(fixedExpenses || []), // Ensure prevExpenses is an array
            {
                _id: Math.random().toString(36).substr(2, 8),
                name: "housing",
                amount: Number(formData.housingCost) || 0, // Ensure a valid value
                firstPaymentDate: new Date(), // Add this if applicable
                totalInstallments: 0, // Add this if applicable
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                _id: Math.random().toString(36).substr(2, 8),
                name: "education",
                amount: Number(formData.educationCost) || 0, // Ensure a valid value
                firstPaymentDate: new Date(), // Add this if applicable
                totalInstallments: 0, // Add this if applicable
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ];

        await Promise.all([

            updateUserAddCategoriesMutation.mutateAsync({
                id: user?._id ?? "",
                categories,
            }),

            updateUserAddFixedExpensesMutation.mutateAsync({
                id: user?._id ?? "",
                fixedExpenses: updatedExpenses,
            }),

            updateUserAddSavingMutation.mutateAsync({ id: user?._id ?? "", saving }),
        ]);

        await showSuccessAlert("Welcome!", "Details saved successfully!", 1000);
        router.push("/categories");
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to BudgetWise!</h1>
            <p className={styles.subtitle}>Please fill out the details below to get started:</p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.gridContainer}>
                    <div className={styles.gridItem}>
                        <h1 >Personal Information</h1>

                        {/* Household Type */}
                        <label className={styles.label}>
                            Household Type: *
                            <select
                                name="householdType"
                                value={formData.householdType}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            >
                                <option value="">Select household type</option>
                                <option value="single">Single</option>
                                <option value="partnered">With Partner</option>
                            </select>
                        </label>
                        <label className={styles.label}>
                            Number of Children: *
                            <input
                                type="number"
                                name="dependents"
                                value={formData.dependents}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Enter number of dependents"
                                required
                            />
                        </label>

                        {/* Housing */}
                        <label className={styles.label}>
                            What is your housing situation?:
                            <select
                                name="housing"
                                value={formData.housing}
                                onChange={handleInputChange}
                                className={styles.input}
                            >
                                <option value="">Select housing type</option>
                                <option value="rent">Rent</option>
                                <option value="own">Own</option>
                                <option value="livingWithFamily">Living with Family</option>
                            </select>
                        </label>

                    </div>
                    <div className={styles.gridItem}>

                        <label className={styles.label}>
                            Start of Budget Month: *
                            <select
                                name="startBudgetMonth"
                                value={formData.startBudgetMonth}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            >
                                <option value="">Select a date</option>
                                <option value="1">1st of the Month</option>
                                <option value="10">10th of the Month</option>
                            </select>
                        </label>

                        {/* Estimated Income */}
                        <label className={styles.label}>
                            Estimated Monthly Income: *
                            <input
                                type="number"
                                name="estimatedIncome"
                                value={formData.estimatedIncome}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Enter your monthly income"
                                required
                            />
                        </label>

                        {/* Income Sources */}
                        <label className={styles.label}>
                            Income Sources:
                            <select
                                name="incomeSources"
                                value={formData.incomeSources}
                                onChange={handleInputChange}
                                className={styles.input}
                            >
                                <option value="">Select source</option>
                                <option value="salary">Salary</option>
                                <option value="business">Business</option>
                                <option value="investments">Investments</option>
                                <option value="other">Other</option>
                            </select>
                        </label>

                        {/* Budget Priority */}
                        <label className={styles.label}>
                            What is your top budgeting priority?
                            <select
                                name="budgetPriority"
                                value={formData.budgetPriority}
                                onChange={handleInputChange}
                                className={styles.input}
                            >
                                <option value="">Select a priority</option>
                                <option value="avoidOverspending">Avoid Overspending</option>
                                <option value="increaseSavings">Increase Savings</option>
                                <option value="investLongTerm">Invest for Long Term</option>
                                <option value="improveQualityOfLife">Improve
                                    Quality of Life</option>
                            </select>
                        </label>
                    </div>
                    
                    <div className={styles.gridItem}>

                        <h1 >Loans, Debts and Savings</h1>
                        {/* Loans */}
                        <label className={styles.label}>
                            Do you have any loans? *
                            <select
                                name="loans"
                                value={formData.loans}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            >
                                <option value="">Select option</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </label>

                        {/* Debts */}
                        <label className={styles.label}>
                            Do you have any debts? *
                            <select
                                name="debts"
                                value={formData.debts}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            >
                                <option value="">Select option</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </label>

                        {/* Savings */}
                        <label className={styles.label}>
                            Current Savings:
                            <select
                                name="savings"
                                value={formData.savings}
                                onChange={handleInputChange}
                                className={styles.input}
                            >
                                <option value="">Select range</option>
                                <option value="0">None</option>
                                <option value="1000">Less than $1,000</option>
                                <option value="1000-5000">$1,000 - $5,000</option>
                                <option value="5000-10000">$5,000 - $10,000</option>
                                <option value=">10000">More than $10,000</option>
                            </select>
                        </label>

                        {/* Emergency Fund */}
                        <label className={styles.label}>
                            Do you have an emergency fund?
                            <select
                                name="emergencyFund"
                                value={formData.emergencyFund}
                                onChange={handleInputChange}
                                className={styles.input}
                            >
                                <option value="">Select option</option>
                                <option value="no">No</option>
                                <option value="yes">Yes</option>
                            </select>
                        </label>

                        {formData.emergencyFund === "yes" && (
                            <label className={styles.label}>
                                How much do you have in your emergency fund?
                                <input
                                    type="number"
                                    name="emergencyFundAmount"
                                    value={formData.emergencyFundAmount || ""}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Enter amount"
                                />
                            </label>
                        )}
                    </div>

                    <div className={styles.gridItem}>
                        <h1 >Expenses</h1>
                        <label className={styles.label}>
                            How much do you spend on housing? *
                            <input
                                type="number"
                                name="housingCost"
                                value={formData.housingCost}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Enter your monthly housing cost"
                                required
                            />
                        </label>


                        <label className={styles.label}>
                            How much do you spend on education? *
                            <input
                                type="number"
                                name="educationCost"
                                value={formData.educationCost}
                                onChange={handleInputChange}
                                className={styles.input}
                                placeholder="Enter your monthly housing cost"
                                required
                            />
                        </label>

                        <label className={styles.label}>
                            Do you have any other fixed expenses?
                            {fixedExpenses.map((expense) => (
                                <div key={expense._id} className={styles.fixedExpense}>
                                    <input
                                        type="text"
                                        placeholder="Expense Name"
                                        value={expense.name}
                                        onChange={(e) =>
                                            handleFixedExpenseChange(expense._id, "name", e.target.value)
                                        }
                                        className={styles.input}
                                    />
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        value={expense.amount || ""}
                                        onChange={(e) =>
                                            handleFixedExpenseChange(expense._id, "amount", Number(e.target.value))
                                        }
                                        className={styles.input}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => removeFixedExpense(expense._id)}
                                        className={styles.removeButton}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addFixedExpense}
                                className={styles.addButton}
                            >
                                + Add Fixed Expense
                            </button>
                        </label>
                    </div>
                    <div className={styles.gridItem}>
                        <h1>Lifestyle</h1>
                        {/* Has Car */}
                        <label className={styles.label}>
                            Do you own a car?: *
                            <select
                                name="hasCar"
                                value={formData.hasCar}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            >
                                <option value="">Select option</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </label>

                        {/* Number of Cars */}
                        {formData.hasCar === "yes" && (
                            <label className={styles.label}>
                                Number of Cars: *
                                <input
                                    type="number"
                                    name="numberOfCars"
                                    value={formData.numberOfCars}
                                    onChange={handleInputChange}
                                    className={styles.input}
                                    placeholder="Enter number of cars"
                                    required
                                />
                            </label>
                        )}



                        {/* Entertainment Preference */}
                        <label className={styles.label}>
                            Level of Entertainment Preference:
                            <select
                                name="entertainmentPreference"
                                value={formData.entertainmentPreference}
                                onChange={handleInputChange}
                                className={styles.input}
                                required
                            >
                                <option value="">Select preference</option>
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                            </select>
                        </label>

                        {/* Transportation */}
                        <label className={styles.label}>
                            What is your primary mode of transportation?:
                            <select
                                name="transportation"
                                value={formData.transportation}
                                onChange={handleInputChange}
                                className={styles.input}
                            >
                                <option value="">Select transportation type</option>
                                <option value="car">Car</option>
                                <option value="publicTransport">Public Transport</option>
                                <option value="bicycle">Bicycle</option>
                                <option value="walking">Walking</option>
                            </select>
                        </label>
                    </div>
                </div>
                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    Save Details
                </button>
            </form>
        </div>
    );
};

export default UserDetailsForm;
