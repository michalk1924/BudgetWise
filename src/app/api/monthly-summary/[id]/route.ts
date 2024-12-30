"use server"

import { NextResponse, NextRequest } from "next/server";
import { connectDatabase, getDocumentById } from "@/services/mongo";
import { Transaction } from "@/types/types";
import "jspdf-autotable";

export async function GET(request: NextRequest, { params }: { params: any }) {
  try {

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
    }

    const client = await connectDatabase();

    const user = await getDocumentById(client, "users", id);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    const currentMonth = new Date(Date.now()).getMonth();
    const monthlyTransactions = user?.transactions.filter(
      (t: Transaction) => new Date(t.date).getMonth() == currentMonth
    )
    const totalExpenses = monthlyTransactions.reduce(
      (total: number, transaction: Transaction) =>
        total + (transaction.type === "expense" ? transaction.amount : 0),
      0
    )

    const totalIncomes = monthlyTransactions.reduce(
      (total: number, transaction: Transaction) =>
        total + (transaction.type === "income" ? transaction.amount : 0),
      0
    )

    const totalSaved = monthlyTransactions.reduce(
      (total: number, transaction: Transaction) =>
        total + (transaction.type === "saved" ? transaction.amount : 0),
      0
    )

    return NextResponse.json({
      totalExpenses,
      totalIncomes,
      totalSaved,
      currentMonth,
      monthlyTransactions
    },
      { status: 200 });

  }
  catch (error: any) {
    console.error("Error in user-summary route ");
    return NextResponse.json({
      error
    },
      { status: 500 });
  }
}