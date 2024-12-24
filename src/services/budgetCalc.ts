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
    discretionary: number;
}

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
    housingCost:number;
    dependents: number;
    educationCost:number;
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
        discretionary: 0,
    };

    const income = formData.estimatedIncome || 0;
    const fixedExpenses = formData.fixedExpenses|| 0;
    const variableExpenses = formData.variableExpenses|| 0;

    const savingsPriorityPercentage =
        formData.budgetPriority === "increaseSavings" ? 0.3 : 0.1;
    const debtPriorityPercentage = formData.debts === "yes" ? 0.2 : 0.1;

    // Calculate savings
    budget.savings = income * savingsPriorityPercentage;

    // Calculate debt repayment
    if (formData.loans === "yes" || formData.debts === "yes") {
        budget.debtRepayment = income * debtPriorityPercentage;
    }
    else  budget.debtRepayment =0;

    // Adjust percentages based on user details
    const categoryPercentages = {
        housing: 0.35,
        transportation: formData.hasCar === "yes" ? 0.04 : 0.08,
        car: formData.hasCar === "yes" ? 0.08 * formData.numberOfCars : 0,
        food: (formData.householdType === "single" ? 0.8 : 0.10) + (formData.dependents * 0.01),
        insurance: 0.02,
        health: 0.05,
        education: formData.dependents * 0.06,
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

    const totalPercentages = Object.values(categoryPercentages).reduce(
        (sum, value) => sum + value,
        0
    );
    const normalizationFactor = 1 / totalPercentages;

    for (const category in categoryPercentages) {
        categoryPercentages[category as keyof typeof categoryPercentages] *= normalizationFactor;
    }

    // Divide expenses into categories
    const remainingForExpenses = income - (budget.savings + budget.debtRepayment);
console.log(remainingForExpenses)
    for (const category in budget.expenses) {
        budget.expenses[category as keyof typeof budget.expenses] =
            remainingForExpenses * categoryPercentages[category as keyof typeof budget.expenses];
    }

    // Calculate discretionary funds
    budget.discretionary =
        income -
        (budget.savings +
            budget.debtRepayment +
            Object.values(budget.expenses).reduce((sum, value) => sum + value, 0));

    return budget;
}
