import { NextResponse, NextRequest } from 'next/server';
import { getDocuments, connectDatabase, insertDocument } from '@/services/mongo';

export async function GET() {
    try {
        const client = await connectDatabase();
        const users = await getDocuments(client, 'users');
        return NextResponse.json(users);
    }
    catch (error: any) {
        console.error(`Error getting documents: ${error}`);
        throw error;
    }
}

export async function POST(request : NextRequest) {
    try{
        const client = await connectDatabase();
        const newUser = await request.json();
        const result = await insertDocument(client, 'users', newUser);
        return NextResponse.json(result);
    }
    catch(error : any){
        console.error(`Error inserting document: ${error}`);
        throw error;
    }
}