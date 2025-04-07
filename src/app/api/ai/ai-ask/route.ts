import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface RagRequest {
  context: string;
  messages: Message[];
}

interface RagResponse {
  response: string | null;
}

interface ErrorResponse {
  error: string;
  details?: string;
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<RagResponse | ErrorResponse>> {
  try {
    const { context, messages }: RagRequest = await request.json();

    if (!context || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          error:
            'Invalid input. Please provide a context and an array of messages',
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a helpful assistant. Use the following context to answer the user's questions.
If the information cannot be found in the context, acknowledge that you don't know.

Context:
${context}

Conversation:
${messages
  .map((msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
  .join('\n')}

Assistant:
`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
    });
  } catch (error) {
    console.error('Gemini RAG API error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
