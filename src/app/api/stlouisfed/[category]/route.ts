"use server"

import { NextResponse, NextRequest } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest, { params }: { params: any }) {
    const { category } = await params;
    try {
        const apiKey = process.env.API_KEY;
        if(!apiKey) {
            return NextResponse.json({ error: 'Missing API key' }, { status: 401 });
        }
        
        const url = `https://api.stlouisfed.org/fred/series/observations?series_id=${category}&api_key=${apiKey}&file_type=json`;
        const response = await axios.get(url);
        return NextResponse.json(response.data);
        
    }
    catch (error: any) {
        console.error(`Error fetching data for ${category}`, error.message);
        return NextResponse.json({
            message: `Error fetching data for ${category}`,
            status: 500
        });
    }
}