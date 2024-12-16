import { NextRequest, NextResponse } from 'next/server';
import { createAlertsExceedingBudget, budgetExceededAlert, validateAccountBalance, holidayAndVacationAlerts } from '@/services/alertsFunctions';
import { connectDatabase, getDocuments, patchDocument } from '@/services/mongo';
import { User } from '@/types/types';

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

            const alerts1 = await createAlertsExceedingBudget(user);
            if (alerts1) alerts.push(...alerts1);

            const alerts2 = await budgetExceededAlert(user);
            if (alerts2) alerts.push(...alerts2);

            const alerts3 = await validateAccountBalance(user);
            if (alerts3) alerts.push(...alerts3);

            const alerts4 = await holidayAndVacationAlerts(user);
            if (alerts4) alerts.push(...alerts4);

            await patchDocument(client, "users",user._id,{alerts})
        }

        console.log("Nightly tasks completed successfully.");
        return NextResponse.json({ message: "Nightly tasks completed successfully.", status: 200 });
    } catch (error) {
        console.error("Error during nightly tasks:", error);
        return NextResponse.json({ error: "Error during nightly tasks", status: 500 });
    }
}
