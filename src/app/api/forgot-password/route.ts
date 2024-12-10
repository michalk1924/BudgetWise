
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/services/sendEmail";
import { connectDatabase, getUserByEmail } from "@/services/mongo";
import { promises as fs } from 'fs';

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

        const file = await fs.readFile(process.cwd() + '/src/files/codes.txt', 'utf8');
        
        if (file) {
            let lines = file.split('\n');
            let found = false;
            for (let i = 0; i < lines.length; i++) {
                let line = lines[i];
                let [existingEmail, existingCode] = line.split(':');
                if (existingEmail === email) {
                    lines[i] = `${email}:${code}`;
                    found = true;
                    break;
                }
            }
            if (!found) {
                lines.push(`${email}:${code}`);
            }
            await fs.writeFile(process.cwd() + '/src/files/codes.txt', lines.join('\n'));
        }
        else {
            await fs.writeFile(process.cwd() + '/src/files/codes.txt', `${email}:${code}`);
        }
        await sendEmail(email, 'Reset Password', `the password to reset your password is ${code}`);
        return NextResponse.json({ message: 'Reset password link sent' });


    } catch (error: any) {
        console.error(`Error sending email: ${error}`);
        return NextResponse.json({
            message: 'An error occurred while sending the email',
            error
        }, { status: 500 })
    }
}
