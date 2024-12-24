"use client";

import React, { useState } from "react";
import styles from "./userDetailsForm.module.css";
import { generateBudgetWithCategories } from "@/services/budgetCalc";
import { Category } from "@/types/types";
import useUserStore from "@/store/userStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "@/services/user";

interface FormData {
    fullName: string;
    email: string;
    startBudgetMonth: string;
    estimatedIncome: number;
    incomeSources: "salary" | "business" | "investments" | "other" | "";
    fixedExpenses: "<1000" | "1000-3000" | "3000-5000" | ">5000" | "";
    variableExpenses: "<500" | "500-1000" | "1000-3000" | ">3000" | "";
    loans: "yes" | "no" | "";
    debts: "yes" | "no" | "";
    savings: string;
    emergencyFund: "yes" | "no" | "";
    budgetPriority: "avoidOverspending" | "increaseSavings" | "investLongTerm" | "improveQualityOfLife" | "";
    transportation: string;
    housing: string;
    dependents: number;
    hasCar: "yes" | "no" | "";
    numberOfCars: number;
    hasPets: "yes" | "no" | "";
    numberOfPets: number;
    entertainmentPreference: "low" | "medium" | "high" | "";
    householdType: "single" | "partnered" | "";
}

const UserDetailsForm = () => {
    const { user, initCategories } = useUserStore();

    const queryClient = useQueryClient();

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

    const [formData, setFormData] = useState<FormData>({
        fullName: "",
        email: "",
        startBudgetMonth: "",
        estimatedIncome: 0,
        incomeSources: "",
        fixedExpenses: "",
        variableExpenses: "",
        loans: "",
        debts: "",
        savings: "",
        emergencyFund: "",
        budgetPriority: "",
        transportation: "",
        housing: "",
        dependents: 0,
        hasCar: "",
        numberOfCars: 0,
        hasPets: "",
        numberOfPets: 0,
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("User Details Submitted:", formData);
        alert("Details saved successfully!");
        let budget = generateBudgetWithCategories(formData)

        let categories: Category[] = [];

        for (const category in budget.expenses) {
            const userCategory: Category = {
                _id: Math.random().toString(36).substr(2, 8),
                type: 'general',
                name: category,
                description: category,
                budget: budget.expenses[category as keyof typeof budget.expenses],
                spent: 0,
                month: new Date,
            }
            categories.push(userCategory)
        }
        updateUserAddCategoriesMutation.mutate({ id: user?._id ?? "", categories })
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Welcome to BudgetWise!</h1>
            <p className={styles.subtitle}>Please fill out the details below to get started:</p>

            <form onSubmit={handleSubmit} className={styles.form}>
                {/* Full Name */}
                <label className={styles.label}>
                    Full Name:
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Enter your full name"
                        required
                    />
                </label>

                {/* Email */}
                <label className={styles.label}>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={styles.input}
                        placeholder="Enter your email"
                        required
                    />
                </label>

                {/* Household Type */}
                <label className={styles.label}>
                    Household Type:
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

                {/* Start of Budget Month */}
                <label className={styles.label}>
                    Start of Budget Month:
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
                    Estimated Monthly Income:
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
                        required
                    >
                        <option value="">Select source</option>
                        <option value="salary">Salary</option>
                        <option value="business">Business</option>
                        <option value="investments">Investments</option>
                        <option value="other">Other</option>
                    </select>
                </label>

                {/* Fixed Expenses */}
                <label className={styles.label}>
                    Fixed Monthly Expenses:
                    <select
                        name="fixedExpenses"
                        value={formData.fixedExpenses}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    >
                        <option value="">Select range</option>
                        <option value="<1000">Less than $1,000</option>
                        <option value="1000-3000">$1,000 - $3,000</option>
                        <option value="3000-5000">$3,000 - $5,000</option>
                        <option value=">5000">More than $5,000</option>
                    </select>
                </label>

                {/* Variable Expenses */}
                <label className={styles.label}>
                    Variable Monthly Expenses:
                    <select
                        name="variableExpenses"
                        value={formData.variableExpenses}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    >
                        <option value="">Select range</option>
                        <option value="<500">Less than $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-3000">$1,000 - $3,000</option>
                        <option value=">3000">More than $3,000</option>
                    </select>
                </label>

                {/* Loans */}
                <label className={styles.label}>
                    Do you have any loans?:
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
                    Do you have any debts?:
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
                        required
                    >
                        <option value="">Select range</option>
                        <option value="<1000">Less than $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="5000-10000">$5,000 - $10,000</option>
                        <option value=">10000">More than $10,000</option>
                    </select>
                </label>

                {/* Emergency Fund */}
                <label className={styles.label}>
                    Do you have an emergency fund?:
                    <select
                        name="emergencyFund"
                        value={formData.emergencyFund}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    >
                        <option value="">Select option</option>
                        <option value="no">No</option>
                        <option value="yes">Yes</option>
                    </select>
                </label>

                {/* Budget Priority */}
                <label className={styles.label}>
                    What is your top budgeting priority?:
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

                <label className={styles.label}>
                    Number of Dependents:
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

                {/* Has Car */}
                <label className={styles.label}>
                    Do you own a car?:
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
                        Number of Cars:
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

                {/* Has Pets */}
                <label className={styles.label}>
                    Do you have pets?:
                    <select
                        name="hasPets"
                        value={formData.hasPets}
                        onChange={handleInputChange}
                        className={styles.input}
                        required
                    >
                        <option value="">Select option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>
                </label>

                {/* Number of Pets */}
                {formData.hasPets === "yes" && (
                    <label className={styles.label}>
                        Number of Pets:
                        <input
                            type="number"
                            name="numberOfPets"
                            value={formData.numberOfPets}
                            onChange={handleInputChange}
                            className={styles.input}
                            placeholder="Enter number of pets"
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

                {/* Submit Button */}
                <button type="submit" className={styles.submitButton}>
                    Save Details
                </button>
            </form>
        </div>
    );
};

export default UserDetailsForm;
