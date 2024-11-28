import { NextResponse, NextRequest } from 'next/server';
import { getDocumentById, connectDatabase, insertDocument } from '@/services/mongo';

export async function GET(request: NextRequest, { params }: { params: any }){
    try{
        const { id } = await params;
        const client = await connectDatabase();
        const user = await getDocumentById(client, 'users', id);
        return NextResponse.json(user);
    }
    catch(error : any){
        console.error(`Error fetching document: ${error}`);
        throw error;
    }
}