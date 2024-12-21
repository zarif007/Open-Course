import { NextApiRequest, NextApiResponse } from 'next';
import { callLangFlowAPI } from '@/utils/langflow/callLangFlowAI';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const message = await req.json();

    const result = await callLangFlowAPI(
      message.content,
      process.env.LANGFLOW_API_TOKEN as string
    );
    return NextResponse.json({
      content: result,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
