import { NextRequest, NextResponse } from 'next/server';
import userService from '@/services/user';
import { validateAccountBalance } from '@/services/alertsFunctions';

export async function GET(req: NextRequest) {
    console.log("Running nightly tasks...");
    try {
        const users = await userService.getAllUsers();

        if (!users || users.length === 0) {
            console.error("No users found");
            return NextResponse.json({ message: "No users found" });
        }

        for (const user of users) {
            console.log(`Processing user: ${user.id}`);
            validateAccountBalance(user);
            /*TO DO: run here all functions*/
        }

        console.log("Nightly tasks completed successfully.");
        return NextResponse.json({ message: "Nightly tasks completed successfully." });
    } catch (error) {
        console.error("Error during nightly tasks:", error);
        return NextResponse.json({ error: "Error during nightly tasks" });
    }
}
