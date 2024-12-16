import { NextRequest, NextResponse } from 'next/server';
import userService from '@/services/user';
import { createAlertsExceedingBudget, budgetExceededAlert, validateAccountBalance, holidayAndVacationAlerts } from '@/services/alertsFunctions';
import { Alert } from '@/types/types';

export async function GET(req: NextRequest) {
    console.log("Running nightly tasks...");
    try {

        if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ message: 'Unauthorized', status: 401 });
        }

        const users = await userService.getAllUsers();

        if (!users || users.length === 0) {
            console.error("No users found");
            return NextResponse.json({ message: "No users found", status: 404 });
        }

        for (const user of users) {

            console.log(`Processing user: ${user.id}`);

            const alerts = await user?.alerts;
            const existingConditions = new Set(alerts?.map((alert:Alert) => alert.triggerCondition)); // Track existing triggerConditions

            const alerts1 = await createAlertsExceedingBudget(user);
            if (alerts1) {
                alerts1.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition); // Add the new condition to the set
                    }
                });
            }
            
            const alerts2 = await budgetExceededAlert(user);
            if (alerts2) {
                alerts2.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition); // Add the new condition to the set
                    }
                });
            }
            
            const alerts3 = await validateAccountBalance(user);
            if (alerts3) {
                alerts3.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition); // Add the new condition to the set
                    }
                });
            }
            
            const alerts4 = await holidayAndVacationAlerts(user);
            if (alerts4) {
                alerts4.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition); // Add the new condition to the set
                    }
                });
            }

            await userService.updateUser(user.id, { alerts });
        }

        console.log("Nightly tasks completed successfully.");
        return NextResponse.json({ message: "Nightly tasks completed successfully.", status: 200 });
    } catch (error) {
        console.error("Error during nightly tasks:", error);
        return NextResponse.json({ error: "Error during nightly tasks", status: 500 });
    }
}
