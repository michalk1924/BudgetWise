
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/services/sendEmail";
import { connectDatabase, getCodeByUserID, getUserByEmail, insertDocument, putDocument } from "@/services/mongo";

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

        const code = Math.floor(100000 + Math.random() * 900000).toString();

        const userId = user._id.toString();

        const userCodeObj = await getCodeByUserID(client, userId);
        let result;
        if (userCodeObj) {
            result = await putDocument(client, "codes", userCodeObj._id.toString(), { user_id: userId, code: code });
        } else {
            result = await insertDocument(client, "codes", { user_id: userId, code: code });
        }

        if (result) {
            await sendEmail(email, 'Reset Password', `the code to reset your password is ${code}`);
            return NextResponse.json({ message: 'Reset password link sent' });
        }
        else {
            return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
        }


    } catch (error: any) {
        console.error(`Error sending email: ${error}`);
        return NextResponse.json({
            message: 'An error occurred while sending the email',
            error
        }, { status: 500 })
    }
}
