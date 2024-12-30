"use server"

import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: any }) {
  return new NextResponse("get monthly summary");
}