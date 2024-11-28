"use service"

import { MongoClient, ObjectId } from "mongodb";
import { connectDatabase, insertDocument, getDocuments, updateDocument, deleteDocument } from '../services/mongo.ts';

async function testDatabaseFunctions() {
  let client;
  let db;

  try {
    client = await connectDatabase();
    db = client.db(process.env.DB_NAME);

    const testDoc = { name: "Test Doc", value: 10 };
    const insertResult = await insertDocument(client, "testCollection", testDoc);
    console.log("insertDocument result:", insertResult);

    const { insertedId } = insertResult;
    const documents = await getDocuments(client, "testCollection", { _id: new ObjectId(insertedId) });
    console.log("getDocuments result:", documents);

    const updatedDoc = { value: 15 };
    const updateResult = await updateDocument(client, "testCollection", insertedId.toString(), updatedDoc);
    console.log("updateDocument result:", updateResult);

    const updatedDocuments = await getDocuments(client, "testCollection", { _id: new ObjectId(insertedId) });
    console.log("Updated document:", updatedDocuments);

    const deleteResult = await deleteDocument(client, "testCollection", insertedId.toString());
    console.log("deleteDocument result:", deleteResult);

    const documentsAfterDelete = await getDocuments(client, "testCollection", { _id: new ObjectId(insertedId) });
    console.log("Documents after delete:", documentsAfterDelete);
    
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    if (client) {
      await client.close();
    }
  }
}

testDatabaseFunctions();
