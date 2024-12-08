import { NextResponse, NextRequest } from 'next/server';
import { getDocumentById, connectDatabase, patchDocument, putDocument, deleteDocument } from '@/services/mongo';

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

export async function PUT(request: NextRequest, { params }: { params: any}){
    try{
        const { id } = await params;
        const client = await connectDatabase();
        const updatedUser = await request.json();
        const result = await putDocument(client, 'users', id, updatedUser);
        return NextResponse.json(result);
    }
    catch(error : any){
        console.error(`Error updating document: ${error}`);
        throw error;
    }
}

export async function PATCH(request: NextRequest, { params }: { params: any}){
    try{
        const { id } = await params;
        const client = await connectDatabase();
        const updatedUser = await request.json();
        const result = await patchDocument(client, 'users', id, updatedUser);
        return NextResponse.json(result);
    }
    catch(error : any){
        console.error(`Error patching document: ${error}`);
        throw error;
    }
}

export async function DELETE(request: NextRequest, { params }: { params: any}){
    try{
        const { id } = await params;
        const client = await connectDatabase();
        const result = await deleteDocument(client, 'users', id);
        return NextResponse.json(result);
    }
    catch(error : any){
        console.error(`Error deleting document: ${error}`);
        throw error;
    }
}