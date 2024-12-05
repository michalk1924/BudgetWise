import { NextResponse, NextRequest } from "next/server";
import { connectDatabase, getUserByEmail, insertDocument } from "@/services/mongo";


export async function POST(request: NextRequest) {
    try {
        const client = await connectDatabase();

        const { email, name } = await request.json();

        let user = await getUserByEmail(client, email);

        if (!user) {
            await insertDocument(client, "users", { name: name, email: email });
            user = await getUserByEmail(client, email);
        }

        return NextResponse.json({user: user});

    } catch (error: any) {
        console.error('Error during POST request:', error);
        return NextResponse.json({ message: 'Error sign in with google', error: error.message || error }, { status: 500 });
    }
}
