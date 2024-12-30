import { NextRequest, NextResponse } from 'next/server';
import { createExceedingBudgetByCategoryAlerts, createTotalBudgetExceededAlerts, createValidateAccountBalance, createHolidayAndVacationAlerts } from '@/services/alertsFunctions';
import { CreateTransactionByFixedExpense } from "../../../services/fixedExpenseFunction"
import { connectDatabase, getDocuments, patchDocument } from '@/services/mongo';
import { User, Alert } from '@/types/types';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    console.log("Running nightly tasks...");
    try {

        if (req.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ message: 'Unauthorized', status: 401 });
        }

        const client = await connectDatabase();
        const data = await getDocuments(client, "users");
        const users = data as unknown as User[];


        if (!users || users.length === 0) {
            console.error("No users found");
            return NextResponse.json({ message: "No users found", status: 404 });
        }

        console.log("users");

        for (const user of users) {

            console.log(`Processing user: ${user._id}`);
            const alerts = user?.alerts ?? [];
            const userTransactions = user?.transactions ?? [];
            const existingConditions = new Set(alerts?.map((alert: Alert) => alert.triggerCondition));

            const exceedingBudgetAlerts = await createExceedingBudgetByCategoryAlerts(user);
            if (exceedingBudgetAlerts) {
                exceedingBudgetAlerts.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition);
                    }
                });
            }

            const totalBudgetExceededAlerts = await createTotalBudgetExceededAlerts(user);
            if (totalBudgetExceededAlerts) {
                totalBudgetExceededAlerts.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition);
                    }
                });
            }

            const validateAccountBalanceAlerts = await createValidateAccountBalance(user);
            if (validateAccountBalanceAlerts) {
                validateAccountBalanceAlerts.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition);
                    }
                });
            }

            const holidayAndVacationAlerts = await createHolidayAndVacationAlerts(user);
            if (holidayAndVacationAlerts) {
                holidayAndVacationAlerts.forEach((alert) => {
                    if (!existingConditions.has(alert.triggerCondition)) {
                        alerts.push(alert);
                        existingConditions.add(alert.triggerCondition);
                    }
                });
            }

            const transactions = await CreateTransactionByFixedExpense(user)
            if (transactions) {
                transactions.forEach((transaction) => {
                    userTransactions.push(transaction);
                })
            }

            await patchDocument(client, "users", user._id, { alerts });
            await patchDocument(client, "users", user._id, {userTransactions});
        }

        console.log("Nightly tasks completed successfully.");
        return NextResponse.json({ message: "Nightly tasks completed successfully.", status: 200 });
    } catch (error) {
        console.error("Error during nightly tasks:", error);
        return NextResponse.json({ error: "Error during nightly tasks", status: 500 });
    }
}
