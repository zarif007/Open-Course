import { NextRequest, NextResponse } from 'next/server';
import { reqGroqAI } from '@/utils/groq';

// Define the expected request body type
interface RequestBody {
  content: string;
}

// Define the response type from Groq AI
interface GroqAIResponse {
  choices: Array<{
    message?: {
      content: string;
    };
  }>;
}

// Define the API response types
interface SuccessResponse {
  content: string;
}

interface ErrorResponse {
  message: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  if (req.method !== 'POST') {
    return NextResponse.json(
      { message: 'Only POST requests are allowed' } as ErrorResponse,
      { status: 405 }
    );
  }

  try {
    const data = (await req.json()) as RequestBody;

    const chatCompletion = (await reqGroqAI(data.content)) as GroqAIResponse;

    return NextResponse.json({
      content: chatCompletion.choices[0]?.message?.content || '',
    } as SuccessResponse);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' } as ErrorResponse,
      { status: 500 }
    );
  }
}
