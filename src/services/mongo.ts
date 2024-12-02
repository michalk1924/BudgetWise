"use server";

import { MongoClient, ObjectId } from "mongodb";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient>;

export async function connectDatabase() {
    if (!client) {
        const dbConnectionString = process.env.PUBLIC_DB_CONNECTION;
        if (!dbConnectionString) {
            throw new Error('Database connection string is not defined');
        }
        client = new MongoClient(dbConnectionString);
        clientPromise = client.connect();
    }
    return clientPromise;
}

export async function getDocuments(client: MongoClient, collection: string, filter: object = {}) {
    try {
        const db = client.db(process.env.DB_NAME);
        const documents = await db.collection(collection).find(filter).toArray();
        console.log(documents);
        return documents;
    }
    catch (error) {
        console.error(`Error getting documents: ${error}`);
        throw error;
    }
}

export async function getDocumentById(client: MongoClient, collection: string, id: string) {
    try {
        const db = client.db(process.env.DB_NAME);
        const document = await db.collection(collection).findOne({ _id: new ObjectId(id) });
        return document;
    }
    catch (error) {
        console.error(`Error getting document by ID: ${error}`);
        throw error;
    }
}

export async function insertDocument(client: MongoClient, collection: string, document: object) {
    try {
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection(collection).insertOne(document);
        return result;
    }
    catch (error) {
        console.error(`Error inserting document: ${error}`);
        throw error;
    }
}

export async function putDocument(
    client: MongoClient,
    collection: string,
    documentId: string,
    updatedDocument: object
) {
    try {
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection(collection).replaceOne(
            { _id: new ObjectId(documentId) },
            updatedDocument
        );
        return result;
    } catch (error) {
        console.error(`Error updating document: ${error}`);
        throw error;
    }
}

export async function updateDocument(
    client: MongoClient,
    collection: string,
    documentId: string,
    updatedDocument: object
) {
    try {
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection(collection).updateOne(
            { _id: new ObjectId(documentId) },
            { $set: updatedDocument }
        );
        return result;
    } catch (error) {
        console.error(`Error patching document: ${error}`);
        throw error;
    }
}

export async function deleteDocument(client: any, collection: string, documentId: string) {
    try {
        const db = client.db(process.env.DB_NAME);
        const result = await db.collection(collection).deleteOne({ _id: new ObjectId(documentId) });
        return result;
    }
    catch (error) {
        console.error(`Error deleting document: ${error}`);
        throw error;
    }
}

export async function closeDatabase() {
    if (client) {
        await client.close();
        client = null;
    }
}