import { NextRequest, NextResponse } from 'next/server';
import cron from 'node-cron';
import userService from '@/services/user';
import { validateAccountBalance } from '@/services/alertsFunctions';

let cronInitialized = false;

const startCronJobs = () => {
    if (!cronInitialized) {
        // Schedule the cron job to run every night at midnight
        cron.schedule('0 0 * * *', async () => {
            console.log("Running nightly tasks...");
            try {
                const users = await userService.getAllUsers();

                if (!users || users.length === 0) {
                    console.error("No users found");
                    return;
                }

                for (const user of users) {
                    validateAccountBalance(user);
                }

                console.log("Nightly tasks completed successfully.");
            } catch (error) {
                console.error("Error during nightly tasks:", error);
            }
        });

        cronInitialized = true;
        console.log("Cron jobs initialized");
    }
};

// Automatically start cron jobs when the server starts
startCronJobs();

export async function GET(req: NextRequest) {
    return NextResponse.json({ message: "Cron jobs already initialized" });
}
