// import { NextResponse, NextRequest } from "next/server";
// import { connectDatabase, getPassword, getUserByEmail, insertDocument } from "@/services/mongo";
// const nodemailer = require('nodemailer');
// const fs = require('fs');

import { NextResponse, NextRequest } from "next/server";

// export async function POST(request: NextRequest) {
//     try {
//         const client = await connectDatabase();

//         const { email, name } = await request.json();

//         const user = await getUserByEmail(client, email);

//         if (!user) {
//             await insertDocument(client, "users", { name: name, email: email });
//         }

//         return NextResponse.json("success");

//     } catch (error: any) {
//         console.error('Error during POST request:', error);
//         return NextResponse.json({ message: 'Error sign in with google', error: error.message || error }, { status: 500 });
//     }
// }

// async function forgotPassword(email: string) {
//     try {
//         const code = Math.floor(100000 + Math.random() * 900000).toString();
//         let data = await fs.promises.readFile('./files/codes.txt', 'utf8');
//         let lines = data.split('\n');
//         let found = false;
//         for (let i = 0; i < lines.length; i++) {
//             let line = lines[i];
//             let [existingEmail, existingCode] = line.split(':');
//             if (existingEmail === email) {
//                 lines[i] = `${email}:${code}`;
//                 found = true;
//                 break;
//             }
//         }
//         if (!found) {
//             lines.push(`${email}:${code}`);
//         }
//         await fs.promises.writeFile('./files/codes.txt', lines.join('\n'));
//         await sendEmail(email, 'Here is your code', `Your code is: ${code}`);
//         console.log('Password reset code sent successfully');
//     } catch (error) {
//         console.error('Error sending password reset code:', error);
//         throw error;
//     }
// }

export async function POST(request: NextRequest){
    return new NextResponse("not work now!");
}
