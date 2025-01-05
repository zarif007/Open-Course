import { NextRequest, NextResponse } from 'next/server';

// Types
interface LangFlowResponse {
  result?: any;
  error?: string;
}

interface LangFlowPayload {
  input_value: string;
  output_type: string;
  input_type: string;
  tweaks: Record<string, unknown>;
}

// Configuration
const CONFIG = {
  BASE_URL: 'https://api.langflow.astra.datastax.com',
  TIMEOUT: 60000, // 60 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 10000, // 1 second
};

// Utility function for delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Main API call function with retries
export async function callLangFlowAPIWithRetry(
  message: string,
  applicationToken: string,
  attempt = 1
): Promise<LangFlowResponse> {
  const LANGFLOW_URL = `${CONFIG.BASE_URL}/lf/ecc86fb1-c32a-4989-b486-dfb296a87f41/api/v1/run/63622ed9-9608-4d2c-91ea-a5bf7a3e8b6f?stream=false`;

  if (!applicationToken) {
    throw new Error('API token is required');
  }

  const payload: LangFlowPayload = {
    input_value: message,
    output_type: 'chat',
    input_type: 'chat',
    tweaks: {
      'ChatInput-ECwzm': {},
      'Prompt-AFBDK': {},
      'ChatOutput-9CNa7': {},
      'GroqModel-hL2wW': {},
    },
  };

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), CONFIG.TIMEOUT);

    const response = await fetch(LANGFLOW_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${applicationToken}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return { result: data };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      if (attempt < CONFIG.RETRY_ATTEMPTS) {
        console.log(`Attempt ${attempt} timed out, retrying...`);
        await delay(CONFIG.RETRY_DELAY * attempt);
        return callLangFlowAPIWithRetry(message, applicationToken, attempt + 1);
      }
      throw new Error(
        `Request timed out after ${CONFIG.RETRY_ATTEMPTS} attempts`
      );
    }
    throw error;
  }
}

// API Route Handler
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const message = await req.json();
    const apiToken = process.env.LANGFLOW_API_TOKEN;

    if (!apiToken) {
      return NextResponse.json(
        { error: 'API token not configured' },
        { status: 500 }
      );
    }

    const result = await callLangFlowAPIWithRetry(message.content, apiToken);

    return NextResponse.json({
      content: result,
    });
  } catch (error) {
    console.error('API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    const status = errorMessage.includes('timed out') ? 504 : 500;

    return NextResponse.json({ error: errorMessage }, { status });
  }
}
