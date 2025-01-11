import { NextRequest, NextResponse } from 'next/server';
import { connectDatabase, getDocuments, patchDocument, getUserByEmail } from '@/services/mongo';
import { MonthlySummary } from '@/types/types'
import { getMonthlySummaryByUserId } from '@/services/monthly-summary';
import { generatePDF } from '@/services/createPdf';
import sendEmail from '@/services/sendEmail';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {

        const client = await connectDatabase();
        const users = await getDocuments(client, "users");
        if (!users) {
            console.error("No users found in database");
            return NextResponse.json({ message: "No users found in database", status: 404 });
        }

        for (let user of users) {
            const userCategories = user?.categories;

            if (!userCategories) {
                console.error(`No categories found for user ${user.username}`);
                continue;
            }
            for (let category of userCategories) {
                if (!category.monthlyBudget) {
                    category.monthlyBudget = [];
                }

                category.monthlyBudget.push({
                    _id: Math.random().toString(36).substring(2, 15),
                    month: new Date(new Date().setMonth(new Date().getMonth() - 1)),
                    budget: category.budget,
                    spent: category.spent
                })
                category.spent = 0;
            }

            await patchDocument(client, "users", user._id.toString(), { categories: userCategories });

            const userId = user._id.toString();
            const data: MonthlySummary = await getMonthlySummaryByUserId(userId);

            if (!data) {
                console.error("Failed to get monthly summary");
                return;
            }
            const { totalExpenses, totalIncomes, totalSaved, monthlyTransactions } = data;

            const pdfBuffer = generatePDF(totalExpenses, totalIncomes, totalSaved, monthlyTransactions).output("arraybuffer");
            sendEmail(user?.email, "Monthly summary", "Here is your monthly summary.", pdfBuffer);
        }

        return NextResponse.json({ message: 'sucess', status: 200 });

    }

    catch (error: any) {
        console.error(`Error reset the month budget`);
        return NextResponse.json({ message: 'Error reset the month budget', error: error.message || error }, { status: 500 });
    }
}