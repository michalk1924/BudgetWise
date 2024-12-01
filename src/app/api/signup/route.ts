import { NextResponse, NextRequest } from "next/server";
import { connectDatabase, insertDocument, getUserByEmail } from "@/services/mongo";
import { signup } from '@/services/authFunctions'


export async function POST(request: NextRequest, { params }: { params: any }) {
    try {
        const client = await connectDatabase();

        const { name, email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });
        }

        const user = await getUserByEmail(client, email);
        if (user) {
            return NextResponse.json({ error: 'User already exists' }, { status: 400 });
        }

        const result = await insertDocument(client, 'users', { name:name, email: email });
        if (!result.acknowledged) {
            return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
        }
        
        const userId = result.insertedId.toString();        

        const { hashedPassword, token } = await signup(password, userId);
        
        const passwordResult = await insertDocument(client, 'passwords', { user_id: userId, password: hashedPassword });
        if (!passwordResult.acknowledged) {
            return NextResponse.json({ error: 'Failed to create password' }, { status: 500 });
        }
        
        return NextResponse.json({ token });
    }
    catch (error) {
        return NextResponse.json({ message: 'Error SignUp', error }, { status: 500 });
    }
}