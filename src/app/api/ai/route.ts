import { NextRequest, NextResponse } from 'next/server';
import { getAI } from '@/utils/getAI';

interface RequestBody {
  content: string;
}

interface SuccessResponse {
  content: string;
}

interface ErrorResponse {
  message: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const data = (await req.json()) as RequestBody;

    const chatCompletion = (await getAI(data.content)) as string;
    console.log(chatCompletion);
    return NextResponse.json({
      content: chatCompletion,
    } as SuccessResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' } as ErrorResponse,
      { status: 500 }
    );
  }
}
