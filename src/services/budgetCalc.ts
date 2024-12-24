// budgetUtils.ts

interface Budget {
    savings: number;
    debtRepayment: number;
    expenses: {
        housing: number;
        transportation: number;
        car: number;
        food: number;
        insurance: number;
        health: number;
        education: number;
        entertainment: number;
        communication: number;
        clothing: number;
        children: number;
        events: number;
        travel: number;
        subscriptions: number;
        gifts: number;
        other: number;
    };
}

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
export function generateBudgetWithCategories(formData: FormData): Budget {
    const budget: Budget = {
        savings: 0,
        debtRepayment: 0,
        expenses: {
            housing: 0,
            transportation: 0,
            car: 0,
            food: 0,
            insurance: 0,
            health: 0,
            education: 0,
            entertainment: 0,
            communication: 0,
            clothing: 0,
            children: 0,
            events: 0,
            travel: 0,
            subscriptions: 0,
            gifts: 0,
            other: 0,
        },
    };

    const income = formData.estimatedIncome || 0;

    // Define priority percentages
    const savingsPriorityPercentage =
        formData.budgetPriority === "increaseSavings" ? 0.3 : 0.1;
    const debtPriorityPercentage = formData.debts === "yes" ? 0.2 : 0.1;

    // Calculate savings
    budget.savings = income * savingsPriorityPercentage;

    // Calculate debt repayment
    budget.debtRepayment =
        formData.loans === "yes" || formData.debts === "yes"
            ? income * debtPriorityPercentage
            : 0;

    // Calculate remaining income for expenses
    const remainingForExpenses =
        income -
        (budget.savings + budget.debtRepayment) -
        (formData.housingCost || 0) -
        (formData.educationCost || 0);

    // Define category percentages
    const categoryPercentages: Partial<Record<keyof Budget["expenses"], number>> = {
        transportation: formData.hasCar === "yes" ? 0.04 : 0.08,
        car: formData.hasCar === "yes" ? 0.08 * formData.numberOfCars : 0,
        food: (formData.householdType === "single" ? 0.08 : 0.10) + formData.dependents * 0.01,
        insurance: 0.01,
        health: 0.05,
        entertainment:
            formData.entertainmentPreference === "high"
                ? 0.08
                : formData.entertainmentPreference === "medium"
                ? 0.05
                : 0.01,
        communication: 0.01,
        clothing: 0.03,
        children: formData.dependents * 0.02,
        events: 0.02,
        travel: 0.02,
        subscriptions: 0.02,
        gifts: 0.01,
        other: 0.2,
    };

    // Normalize category percentages
    const totalPercentages = Object.values(categoryPercentages)
        .filter((value): value is number => value !== undefined)
        .reduce((sum, value) => sum + value, 0);

    const normalizationFactor = totalPercentages > 0 ? 1 / totalPercentages : 1;

    for (const category in categoryPercentages) {
        if (categoryPercentages[category as keyof typeof categoryPercentages] !== undefined) {
            categoryPercentages[category as keyof typeof categoryPercentages]! *= normalizationFactor;
        }
    }

    // Divide expenses into categories
    for (const category in budget.expenses) {
        if (category in categoryPercentages) {
            budget.expenses[category as keyof Budget["expenses"]] =
                remainingForExpenses *
                (categoryPercentages[category as keyof typeof categoryPercentages] || 0);
        }
    }
    budget.expenses["housing"]= formData.housingCost || 0;
    budget.expenses["education"]= formData.educationCost || 0;

    budget.expenses["other"] +=
        income -
        (budget.savings +
            budget.debtRepayment +
            Object.values(budget.expenses).reduce((sum, value) => sum + value, 0));

    return budget;
}
