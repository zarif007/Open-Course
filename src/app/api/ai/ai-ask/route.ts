import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface RagRequest {
  context: string | string[];
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
          error: 'Invalid input. Please provide context and messages',
        },
        { status: 400 }
      );
    }

    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === 'user');
    if (!lastUserMessage) {
      return NextResponse.json(
        {
          error: 'No user message found in the conversation',
        },
        { status: 400 }
      );
    }

    let contextChunks: string[];

    if (typeof context === 'string') {
      contextChunks = splitTextIntoChunks(context, 1000);
    } else if (Array.isArray(context)) {
      contextChunks = context;
    } else {
      return NextResponse.json(
        {
          error: 'Context must be a string or an array of strings',
        },
        { status: 400 }
      );
    }

    const queryEmbeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: lastUserMessage.content,
    });
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

    const contextEmbeddings = await Promise.all(
      contextChunks.map(async (chunk) => {
        const response = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: chunk,
        });
        return {
          chunk,
          embedding: response.data[0].embedding,
        };
      })
    );

    const similarities = contextEmbeddings.map((item) => {
      return {
        chunk: item.chunk,
        similarity: cosineSimilarity(queryEmbedding, item.embedding),
      };
    });

    const maxChunks = Math.min(3, similarities.length);
    const topChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, maxChunks)
      .map((item) => item.chunk);

    const relevantContext = topChunks.join('\n\n');

    const conversationHistory = messages
      .slice(
        0,
        messages.length -
          (messages[messages.length - 1].role === 'user' ? 1 : 2)
      )
      .map(
        (msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      )
      .join('\n');

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `
You are a helpful assistant answering questions based on retrieved information.

RETRIEVED CONTEXT:
${relevantContext}

${
  conversationHistory
    ? `PREVIOUS CONVERSATION:\n${conversationHistory}\n\n`
    : ''
}

USER QUERY: ${lastUserMessage.content}

Answer the user's query using the retrieved context. If the information cannot be found in the context, acknowledge that limitation politely.
Your answer should:
1. Be relevant to the user query
2. Be based on the retrieved context
3. Provide accurate information
4. Be concise yet comprehensive

ANSWER:`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      response: text,
    });
  } catch (error) {
    console.error('RAG API error:', error);
    return NextResponse.json(
      {
        error: 'An error occurred while processing your request',
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

function cosineSimilarity(vecA: number[], vecB: number[]): number {
  if (vecA.length !== vecB.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vecA.length; i++) {
    dotProduct += vecA[i] * vecB[i];
    normA += vecA[i] * vecA[i];
    normB += vecB[i] * vecB[i];
  }

  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);

  if (normA === 0 || normB === 0) {
    return 0;
  }

  return dotProduct / (normA * normB);
}

// Helper function to split text into chunks
function splitTextIntoChunks(text: string, chunkSize: number): string[] {
  const chunks: string[] = [];
  const sentences = text.split(/(?<=[.!?])\s+/);
  let currentChunk = '';

  for (const sentence of sentences) {
    // If adding this sentence would exceed chunk size, save the current chunk and start a new one
    if (
      currentChunk.length + sentence.length > chunkSize &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());
      currentChunk = '';
    }

    currentChunk += sentence + ' ';
  }

  // Add the last chunk if it's not empty
  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}
