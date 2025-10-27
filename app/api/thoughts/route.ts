import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { Thought } from '@/app/types'

export async function GET() {
const { rows } = await sql`
SELECT id, content, created_at FROM thoughts ORDER BY created_at DESC LIMIT 100
`
return NextResponse.json(rows)
}

export async function POST(req: Request) {
try {
const json: Thought = await req.json();
if (json.content === undefined)
    return new NextResponse("missing content field",{status:400});

const { rows } = await sql`
INSERT INTO thoughts (content)
VALUES (${json.content})
RETURNING id, content, created_at
`


return NextResponse.json(rows[0], { status: 201 })
} catch (err: unknown) {
    console.error(err);
return NextResponse.json({ error: 'Server or input error' }, { status: 400 })
}
}