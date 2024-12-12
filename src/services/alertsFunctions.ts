"use server"

import { User, Alert, Solution } from "@/types/types";
import { AlertType } from "@/consts/enums";
import userService from "./user";

const createAlertsExceedingBudget = async () => {
  try {
    // const users = await userService.getAllUsers();
    const users = [
      {
        _id: "user1",
        username: "JohnDoe",
        email: "john.doe@example.com",
        passwordHash: "hashedpassword123",
        totalBudget: 5000,
        totalSpending: 4500,
        categories: [
          {
            _id: "cat1",
            userId: "user1",
            type: "general",
            name: "Groceries",
            description: "Monthly groceries budget",
            budget: 1000,
            spent: 950,
            month: new Date("2024-12-01")
          },
          {
            _id: "cat2",
            userId: "user1",
            type: "personal",
            name: "Entertainment",
            description: "Movies, games, etc.",
            budget: 500,
            spent: 400,
            month: new Date("2024-12-01")
          }
        ],
        savings: [],
        transactions: [],
        alerts: [],
        recommendations: []
      },
      {
        _id: "user2",
        username: "JaneSmith",
        email: "jane.smith@example.com",
        passwordHash: "hashedpassword456",
        totalBudget: 3000,
        totalSpending: 2800,
        categories: [
          {
            _id: "cat3",
            userId: "user2",
            type: "general",
            name: "Travel",
            description: "Travel expenses",
            budget: 1500,
            spent: 1400,
            month: new Date("2024-12-01")
          },
          {
            _id: "cat4",
            userId: "user2",
            type: "personal",
            name: "Fitness",
            description: "Gym and fitness classes",
            budget: 300,
            spent: 290,
            month: new Date("2024-12-01")
          }
        ],
        savings: [],
        transactions: [],
        alerts: [],
        recommendations: []
      },
      {
        _id: "user3",
        username: "AliceBrown",
        email: "alice.brown@example.com",
        passwordHash: "hashedpassword789",
        totalBudget: 4000,
        totalSpending: 3700,
        categories: [
          {
            _id: "cat5",
            userId: "user3",
            type: "general",
            name: "Dining Out",
            description: "Restaurants and cafes",
            budget: 800,
            spent: 750,
            month: new Date("2024-12-01")
          },
          {
            _id: "cat6",
            userId: "user3",
            type: "personal",
            name: "Shopping",
            description: "Clothes and accessories",
            budget: 1000,
            spent: 700,
            month: new Date("2024-12-01")
          }
        ],
        savings: [],
        transactions: [],
        alerts: [],
        recommendations: []
      }
    ];

    if (!users) {
      console.error("No users found");
      return;
    }

    console.log("All users");

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
      console.log(`Alerts for user "${user.username}"`);
      for (const alert of alerts) {
        console.log(alert);
      }
      // await userService.updateUser(user._id, { alerts });
    }
  } catch (err) {
    console.error("Error creating alert exceeding budget", err);
  }
}

export default createAlertsExceedingBudget;

const alerts: Alert[] = [
  {
    alertId: 'fe2d398c-43c2-40b8-88ad-1b382b1ff3c5',
    type: 'BudgetOverrun',
    triggerCondition: 'Your budget for Travel is almost finished. Spent: 1400 / Budget: 1500. Consider reducing expenses.',
    isActive: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    severityLevel: 'critical',
    solutions: [
      {
        id: 'bc2fb225-4b50-495c-9577-7cbae011d51d',
        description: 'Consider increasing the budget for the "Travel" category. Current budget: 1500, Spent: 1400.',
        actionLink: '/categories',
        isRecommended: false
      },
      {
        id: 'f0ef7057-b0ec-4f91-aeea-0b43abfd4dae',
        description: 'Consider using less in the Travel category to stay within your budget. Current budget: 1500, Spent: 1400.',
        actionLink: '/categories',
        isRecommended: true
      },
      {
        id: '204b83df-94e7-43c9-b917-a5019966ce74',
        description: 'View a detailed spending report with a graph of your spending in the "Travel" category. This will help you visualize your spending trends.',
        actionLink: '/reports',
        isRecommended: false
      }
    ]
  },
  {
    alertId: 'c5d257a8-365e-4035-abdc-3fec146b1d4a',
    type: 'BudgetOverrun',
    triggerCondition: 'Your budget for Fitness is almost finished. Spent: 290 / Budget: 300. Consider reducing expenses.',
    isActive: true,
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    severityLevel: 'critical',
    solutions: [
      {
        id: '68a2a038-c246-462b-8398-56dd0c937392',
        description: 'Consider increasing the budget for the "Fitness" category. Current budget: 300, Spent: 290.',
        actionLink: '/categories',
        isRecommended: false
      },
      {
        id: 'deec3550-658d-4169-8dbc-e086a4a9e4ae',
        description: 'Consider using less in the Fitness category to stay within your budget. Current budget: 300, Spent: 290.',
        actionLink: '/categories',
        isRecommended: true
      },
      {
        id: '6f8d5fc8-8df6-45ac-9f13-e441938f5f8f',
        description: 'View a detailed spending report with a graph of your spending in the "Fitness" category. This will help you visualize your spending trends.',
        actionLink: '/reports',
        isRecommended: false
      }
    ]
  }
]