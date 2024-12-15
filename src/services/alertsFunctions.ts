"use server"

import { User, Alert, Solution } from "@/types/types";
import { AlertType } from "@/consts/enums";
import userService from "./user";

export const createAlertsExceedingBudget = async () => {
  try {

    const users = await userService.getAllUsers();

    if (!users) {
      console.error("No users found");
      return;
    }

    for (const user of users) {
      const alerts: Alert[] = user?.alerts;
      for (const category in user?.categories) {
        if (user.categories[category].spent >= user.categories[category].budget * 0.9) {

          const id = crypto.randomUUID();

          const solutions: Solution[] = [];

          const solution1: Solution = {
            id: crypto.randomUUID(),
            description: `Consider increasing the budget for the ${user.categories[category]?.name} category. Current budget: ${user.categories[category]?.budget}, Spent: ${user.categories[category]?.spent}.`,
            actionLink: "/categories",
            isRecommended: false
          };
          solutions.push(solution1);

          const solution2: Solution = {
            id: crypto.randomUUID(),
            description: `Consider using less in the ${user.categories[category]?.name} category to stay within your budget. Current budget: ${user.categories[category]?.budget}, Spent: ${user.categories[category]?.spent}.`,
            actionLink: "/categories",
            isRecommended: true
          };
          solutions.push(solution2);

          const solution3: Solution = {
            id: crypto.randomUUID(),
            description: `View a detailed spending report with a graph of your spending in the "${user.categories[category]?.name}" category. This will help you visualize your spending trends.`,
            actionLink: "/reports",
            isRecommended: false
          };
          solutions.push(solution3);

          const alert: Alert = {
            alertId: id,
            type: AlertType.BudgetOverrun,
            triggerCondition: `Your budget for ${user.categories[category]?.name} is almost finished. Spent: ${user.categories[category]?.spent} / Budget: ${user.categories[category]?.budget}. Consider reducing expenses.`,
            isActive: true,
            createdAt: new Date(Date.now()),
            updatedAt: new Date(Date.now()),
            severityLevel: 'critical',
            solutions: solutions
          }

          alerts.push(alert);
        };
      }

      await userService.updateUser(user._id, { alerts });
    }
  } catch (err) {
    console.error("Error creating alert exceeding budget", err);
  }
}

export const budgetExceededAlert = async () => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      console.error("No users found");
      return;
    }

    for (const user of users) {
      const alerts: Alert[] = user?.alerts || [];
      if (user?.totalSpending >= user?.totalBudget) {

        const solution1 : Solution = {
          id: crypto.randomUUID(),
          description: `Consider reducing your expenses or saving money. Your total budget is exceeded. Spent: ${user.totalSpending} / Budget: ${user.totalBudget}.`,
          actionLink: "/transactions",
          isRecommended: false
        }

        const solution2: Solution = {
          id: crypto.randomUUID(),
          description: `Consider reviewing all your categories to identify where you might need to increase the budget. This will help you stay within your financial goals.`,
          actionLink: `/categories/review`,
          isRecommended: false
        };

        const id = crypto.randomUUID();
        const alert: Alert = {
          alertId: id,
          type: AlertType.BudgetOverrun,
          triggerCondition: `Your total budget is already exceeded. Spent: ${user.totalSpending} / Budget: ${user.totalBudget}. Consider reducing expenses.`,
          isActive: true,
          createdAt: new Date(Date.now()),
          updatedAt: new Date(Date.now()),
          severityLevel: 'critical',
          solutions: [solution1, solution2]
        }
        alerts.push(alert);
        await userService.updateUser(user._id, { alerts });
      }
    }
  }
  catch (err) {
    console.error("Error creating alert exceeding budget", err);
  }
}



export const validateAccountBalance= async (user: User)  => {
  
const budgetMultiplier = 1.5;
const minBalanceMultiplier = 0.2;
    const { balance, totalBudget } = user; // Extract balance and budget from User object

    let balanceAlert: Alert | null = null;
    const alerts: Alert[] = user?.alerts;

    // Validate account balance
    if (balance < 0) {
        balanceAlert = {
            alertId: "balanceAlert",
            type: "balance",
            triggerCondition: "Account balance is negative",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            severityLevel: "critical",
            solutions: [
                {
                    id: "addIncome",
                    description: "Add new income to stabilize account balance.",
                    actionLink: "/income/add",
                    isRecommended: true,
                },
                {
                    id: "reduceExpenses",
                    description: "Review your expenses and reduce non-essential categories.",
                    actionLink: "/transactions",
                },
                {
                    id: "transferSavings",
                    description: "Transfer funds from your savings to cover the balance.",
                    actionLink: "/savings",
                },
            ],
        };
    } else if (balance > budgetMultiplier * totalBudget) {
        balanceAlert = {
            alertId: "balanceAlert",
            type: "balance",
            triggerCondition: "Account balance is large",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            severityLevel: "critical",
            solutions: [
                {
                    id: "transferToSavings",
                    description: "Transfer surplus funds to savings for long-term goals.",
                    actionLink: "/savings",
                    isRecommended: true,
                },
                {
                    id: "investFunds",
                    description: "Invest the surplus funds in suitable investment opportunities.",
                    actionLink: "/investments",
                },
                {
                    id: "prepayLoans",
                    description: "Use the surplus balance to prepay loans or debts, reducing future interest.",
                },
                {
                    id: "increaseDiscretionaryBudget",
                    description: "Increase your budget for categories like entertainment or vacations.",
                    actionLink: "/categories",
                    isRecommended: false,
                },
            ],
        };
    } else if (balance >= 0 && balance < minBalanceMultiplier * totalBudget) {
        balanceAlert = {
            alertId: "balanceAlert",
            type: "balance",
            triggerCondition: "Account balance is critically low",
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            severityLevel: "critical",
            solutions: [
                {
                    id: "addIncome",
                    description: "Add new income to stabilize account balance.",
                    actionLink: "/income/add",
                    isRecommended: true,
                },
                {
                    id: "reduceExpenses",
                    description: "Review your expenses and reduce non-essential categories.",
                    actionLink: "/expenses/review",
                },
                {
                    id: "transferSavings",
                    description: "Transfer funds from your savings to cover the balance.",
                    actionLink: "/savings/transfer",
                },
            ],
        };
        alerts.push(balanceAlert)

    }

    await userService.updateUser(user._id, { alerts });
}
