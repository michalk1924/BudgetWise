"use service"

import { MongoClient, ObjectId } from "mongodb";
import { connectDatabase, insertDocument, getDocuments, updateDocument, deleteDocument } from '../services/mongo.ts';

async function testDatabaseFunctions() {
  let client;
  let db;

  try {
    // התחברות לבסיס נתונים
    client = await connectDatabase();
    db = client.db(process.env.DB_NAME);

    // בדיקה של insertDocument
    const testDoc = { name: "Test Doc", value: 10 };
    const insertResult = await insertDocument(client, "testCollection", testDoc);
    console.log("insertDocument result:", insertResult);

    // בדיקה של getDocuments
    const { insertedId } = insertResult;
    const documents = await getDocuments(client, "testCollection", { _id: new ObjectId(insertedId) });
    console.log("getDocuments result:", documents);

    // בדיקה של updateDocument
    const updatedDoc = { value: 15 };
    const updateResult = await updateDocument(client, "testCollection", insertedId.toString(), updatedDoc);
    console.log("updateDocument result:", updateResult);

    const updatedDocuments = await getDocuments(client, "testCollection", { _id: new ObjectId(insertedId) });
    console.log("Updated document:", updatedDocuments);

    // בדיקה של deleteDocument
    const deleteResult = await deleteDocument(client, "testCollection", insertedId.toString());
    console.log("deleteDocument result:", deleteResult);

    const documentsAfterDelete = await getDocuments(client, "testCollection", { _id: new ObjectId(insertedId) });
    console.log("Documents after delete:", documentsAfterDelete);
    
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    // אם client לא null, סגור את החיבור
    if (client) {
      await client.close();
    }
  }
}

// קריאה לפונקציה
testDatabaseFunctions();
