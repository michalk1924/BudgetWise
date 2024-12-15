"use server"

import { User, Alert, Solution } from "@/types/types";
import { AlertType } from "@/consts/enums";
import userService from "./user";
import { holidays } from "@/consts/consts";
import { differenceInDays, parseISO } from "date-fns";

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

        const solution1: Solution = {
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

export const holidayAndVacationAlerts = async () => {
  try {
    const users = await userService.getAllUsers();
    if (!users) {
      console.error("No users found");
      return;
    }
    const today = new Date();

    for (const holiday of holidays) {
      const holidayDate = parseISO(holiday.date);

      const daysUntilHoliday = differenceInDays(holidayDate, today);

      if (daysUntilHoliday === 14) {

        const alertId = crypto.randomUUID();

        const alert: Alert = {
          alertId,
          type: AlertType.Occasion,
          triggerCondition: `Reminder: ${holiday.name} is in 14 days. Start planning your activities and budget.`,
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          severityLevel: "warning",
          solutions: [
            {
              id: crypto.randomUUID(),
              description: `Plan ahead for ${holiday.name}. Consider activities like spending time with family, budgeting for meals, or organizing trips.`,
              actionLink: "/categories",
              isRecommended: true
            },
            {
              id: crypto.randomUUID(),
              description: `Start saving for ${holiday.name}. Adjust your budget now to ensure you have enough funds for holiday-related expenses.`,
              actionLink: "/saving",
              isRecommended: true
            },
            {
              id: crypto.randomUUID(),
              description: `Spend less on non-essential items to ensure you stay within your budget and are prepared for ${holiday.name}.`,
              actionLink: "/expenses",
              isRecommended: false
            }
          ]
        };

        for (const user of users) {
          const alerts: Alert[] = user?.alerts || [];
          alerts.push(alert);
          await userService.updateUser(user._id, { alerts });
        }
        
      }
    }

  }
  catch (err) {
    console.error("Error creating holiday and vacation alerts", err);
  }
}

