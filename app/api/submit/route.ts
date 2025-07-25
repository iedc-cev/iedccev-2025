import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbwNqJJ0JrODoSV_MNTPI3f-032oIdWcA5_1NkO4qhoLGOlS33Mbw5MSRAKVC9sFhNIeWQ/exec',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return NextResponse.json(result, { status: response.status });
  } catch (error) {
    console.error('ERROR in /api/submit:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
