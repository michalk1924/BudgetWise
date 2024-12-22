import { NextRequest, NextResponse } from 'next/server';
import { connectDatabase, insertDocument } from '@/services/mongo';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
    try {
        const client = await connectDatabase();
        const result = await insertDocument(client, "testCollection", {
            message: "Hello, Next.js!",
            timestamp: new Date(),
        })
        return NextResponse.json(result);
    }
    catch (error: any) {
        console.error("Error inserting document:", error);
        return NextResponse.json({ error: "Error inserting document", status: 500 });
    }
}