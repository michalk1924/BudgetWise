
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/services/sendEmail";
import { connectDatabase, getPassword, getUserByEmail } from "@/services/mongo";

export async function POST(request: NextRequest) {
    try {

        const client = await connectDatabase();

        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 400 });
        }

        const user = await getUserByEmail(client, email);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        const passwordToMail = "password";

        await sendEmail(email, 'Reset Password', `the password to reset your password is ${passwordToMail}`);
        return NextResponse.json({ message: 'Reset password link sent' });


    } catch (error: any) {
        console.error(`Error sending email: ${error}`);
        return NextResponse.json({
            message: 'An error occurred while sending the email',
            error
        })
    }
}
