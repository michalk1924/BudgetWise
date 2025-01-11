
import { NextResponse, NextRequest } from "next/server";
import { getCodeByUserID, connectDatabase, getUserByEmail } from "@/services/mongo";

export async function POST(request: NextRequest) {
    try {
        const { email, code } = await request.json();

        const client = await connectDatabase();

        const user = await getUserByEmail(client, email);
        if (!user) {
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }
        const userId = user._id.toString();
        console.log("userId" + userId);
        const savedCodeObj = await getCodeByUserID(client, userId);
        const savedCode = savedCodeObj.code;

        if (savedCode && savedCode == code) {
            return NextResponse.json(
                { compareCode: true, userId : userId },
                { status: 200 }
            );
        } else {
            return NextResponse.json(
                { compareCode: false },
                { status: 400 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error }, { status: 500 });
    }
}
