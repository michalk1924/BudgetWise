
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/services/sendEmail";
import { connectDatabase, putDocument, getUserByEmail, getPassword } from "@/services/mongo";
import { hash } from "@/services/authFunctions";

export async function POST(request: NextRequest) {
    try {

        const client = await connectDatabase();

        const { email, newPassword } = await request.json();

        const user = await getUserByEmail(client, email);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }
        const userId = user._id.toString();

        console.log("userId" + userId);

        const passwordobj = await getPassword(client, userId);
        console.log(passwordobj);
        
        const password_id = passwordobj._id.toString();

        console.log("password_id" + password_id);

        const { hashedPassword, token } = await hash(newPassword, userId);

        console.log("hashedPassword" + hashedPassword);

        if (hashedPassword) {
            const result = await putDocument(client, "passwords", password_id, {
                user_id: userId,
                password: hashedPassword
            })
            if(!result){
                return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
            }
        }
        if (token){
            return NextResponse.json({ user: user, token: token });
        }
        else{
            return NextResponse.json({ error: 'Failed to update password' }, { status: 500 });
        }

    }
    catch (error) {
        console.error("Error in forgot-password route: ", error);
        return NextResponse.json({
            status: 500,
            error
        });
    }

}
