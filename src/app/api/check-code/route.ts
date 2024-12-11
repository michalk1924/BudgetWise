
import { NextResponse, NextRequest } from "next/server";
import { promises as fs } from 'fs';

interface Codes {
    [email: string]: string;
}

export async function POST(request: NextRequest) {
    try {
        const { email, code } = await request.json();

        const data = await fs.readFile(process.cwd() + '/src/files/codes.txt', 'utf8');
        
        const codes: Codes = data.split('\n').reduce((acc: Codes, line: string) => {
            if (line.trim()) {
                const [mail, cd] = line.split(':');
                if (mail && cd) {
                    acc[mail.trim()] = cd.trim();
                }
            }
            return acc;
        }, {});

        console.log(codes);
        

        const savedCode = codes[email];

        console.log("saved", savedCode, code);

        if (savedCode && savedCode == code) {
            return NextResponse.json(
                { compareCode: true },
                { status: 200 });
        } else {
            return NextResponse.json(
                { compareCode: false },
                { status: 400 });
        }

    } catch (error: any) {
        return NextResponse.json({ error: error}, { status: 500 });
    }
}
