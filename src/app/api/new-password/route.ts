
import { NextResponse, NextRequest } from "next/server";
import sendEmail from "@/services/sendEmail";
import { connectDatabase, putDocument, getDocumentById, getPassword } from "@/services/mongo";
import { hash } from "@/services/authFunctions";

export async function POST(request: NextRequest) {
    try {

        const client = await connectDatabase();

        const { userId, newPassword } = await request.json();        

        const user = await getDocumentById(client, "users", userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        const passwordobj = await getPassword(client, userId);

        if(!passwordobj){
            return NextResponse.json({ error: 'Password not found' }, { status: 404 });
        }
        
        const password_id = passwordobj._id.toString();

        const { hashedPassword, token } = await hash(newPassword, userId);

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
