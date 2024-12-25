import { NextResponse, NextRequest } from "next/server";
import { connectDatabase, getUserByEmail, insertDocument } from "@/services/mongo";


export async function POST(request: NextRequest) {
    try {
        const client = await connectDatabase();

        const { email, name } = await request.json();

        let user = await getUserByEmail(client, email);

        let isNewUser = false;

        if (!user) {

            isNewUser = true;

            const result = await insertDocument(client, 'users', {
                username: name,
                email: email,
                categories: [],
                savings: [],
                transactions: [],
                alerts: [],
                recommendations: [],
                fixedExpenses :[],
            });
            if (!result.acknowledged) {
                return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
            }
            user = await getUserByEmail(client, email);
        }

        return NextResponse.json({ user: user, isNewUser: isNewUser });

    } catch (error: any) {
        console.error('Error during POST request:', error);
        return NextResponse.json({ message: 'Error sign in with google', error: error.message || error }, { status: 500 });
    }
}
