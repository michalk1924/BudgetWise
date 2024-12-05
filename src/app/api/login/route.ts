import { NextResponse, NextRequest } from "next/server";
import { connectDatabase, getPassword, getUserByEmail } from "@/services/mongo";
import { login } from '@/services/authFunctions'


export async function POST(request: NextRequest) {
    try {
        const client = await connectDatabase();

        const { email, password } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email not provided' }, { status: 400 });
        }

        const user = await getUserByEmail(client, email);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const userId = user._id.toString();

        const passwordObj = await getPassword(client, userId);
        if (!passwordObj) {
            return NextResponse.json({ message: 'Password not found' }, { status: 404 });
        }

        const storedHashedPassword = passwordObj.password;

        const token = await login(password, storedHashedPassword, userId);

        return NextResponse.json({ user: user, token: token });

    } catch (error: any) {
        console.error('Error during POST request:', error);  // Log the error for debugging
        return NextResponse.json({ message: 'Error processing login', error: error.message || error }, { status: 500 });
    }
}
