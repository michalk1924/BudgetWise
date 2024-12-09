import { NextResponse, NextRequest } from 'next/server';
import { getDocuments, connectDatabase, insertDocument } from '@/services/mongo';

export async function GET() {
    try {
        const client = await connectDatabase();
        const users = await getDocuments(client, 'users');
        if (!users) {
            console.log("No users found in database");
            return NextResponse.json({
                message: "No users found in database",
                status: 404
            });
        }
        return NextResponse.json(users);
    }
    catch (error: any) {
        console.error(`Error getting documents: ${error}`);
        return NextResponse.json({
            message: "Error getting documents",
            status: 500
        })
    }
}

export async function POST(request: NextRequest) {
    try {
        const client = await connectDatabase();
        const newUser = await request.json();
        const result = await insertDocument(client, 'users', newUser);
        return NextResponse.json(result);
    }
    catch (error: any) {
        console.error(`Error inserting document: ${error}`);
        return NextResponse.json({
            message: "Error inserting document",
            status: 500
        });
    }
}

