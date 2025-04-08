import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

const MAX_GEMINI_TOKENS = 8000;
const MAX_CHUNK_TOKENS = 800;
const MAX_CHUNKS = 5;

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

    const conversationHistory = messages
      .slice(Math.max(0, messages.length - 3)) // Only keep the last 3 messages for context
      .map(
        (msg) => `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
      )
      .join('\n');

    let fullContext: string;
    if (typeof context === 'string') {
      fullContext = context;
    } else if (Array.isArray(context)) {
      fullContext = context.join('\n\n');
    } else {
      return NextResponse.json(
        {
          error: 'Context must be a string or an array of strings',
        },
        { status: 400 }
      );
    }

    const contextChunks = createChunks(fullContext, MAX_CHUNK_TOKENS);

    const queryEmbeddingResponse = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: lastUserMessage.content,
    });
    const queryEmbedding = queryEmbeddingResponse.data[0].embedding;

    const contextEmbeddings = await Promise.all(
      contextChunks.map(async (chunk, index) => {
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

    const topChunks = similarities
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, MAX_CHUNKS)
      .map((item) => item.chunk);

    let relevantContext = topChunks.join('\n\n');
    const estimatedContextTokens = estimateTokens(relevantContext);

    // Create base prompt template
    const promptTemplate = `
You are a helpful assistant answering questions based on retrieved information.

RETRIEVED CONTEXT:
{context}

${
  conversationHistory
    ? `PREVIOUS CONVERSATION:\n${conversationHistory}\n\n`
    : ''
}

USER QUERY: ${lastUserMessage.content}

Answer the user's query using only the retrieved context. If the information cannot be found in the context, acknowledge that limitation politely.
Your answer should:
1. Be relevant to the user query
2. Be based on the retrieved context
3. Provide accurate information
4. Be concise yet comprehensive

ANSWER:`;

    const basePromptTokens = estimateTokens(
      promptTemplate.replace('{context}', '')
    );
    const availableContextTokens = MAX_GEMINI_TOKENS - basePromptTokens;

    if (estimatedContextTokens > availableContextTokens) {
      console.log(
        `Context too large (${estimatedContextTokens} tokens), trimming to fit ${availableContextTokens} tokens`
      );
      relevantContext = trimTextToTokenLimit(
        relevantContext,
        availableContextTokens
      );
    }

    const prompt = promptTemplate.replace('{context}', relevantContext);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
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

function createChunks(text: string, maxTokens: number): string[] {
  const chunks: string[] = [];

  const paragraphs = text.split(/\n\s*\n/);
  let currentChunk = '';

  for (const paragraph of paragraphs) {
    const paragraphTokens = estimateTokens(paragraph);

    if (paragraphTokens > maxTokens) {
      if (currentChunk) {
        chunks.push(currentChunk.trim());
        currentChunk = '';
      }

      const sentences = paragraph.split(/(?<=[.!?])\s+/);
      let sentenceChunk = '';

      for (const sentence of sentences) {
        const sentenceTokens = estimateTokens(sentence);
        if (
          estimateTokens(sentenceChunk + sentence) > maxTokens &&
          sentenceChunk.length > 0
        ) {
          chunks.push(sentenceChunk.trim());
          sentenceChunk = '';
        }

        if (sentenceTokens > maxTokens) {
          if (sentenceChunk) {
            chunks.push(sentenceChunk.trim());
            sentenceChunk = '';
          }

          const words = sentence.split(/\s+/);
          let wordChunk = '';

          for (const word of words) {
            if (
              estimateTokens(wordChunk + ' ' + word) > maxTokens &&
              wordChunk.length > 0
            ) {
              chunks.push(wordChunk.trim());
              wordChunk = word;
            } else {
              wordChunk += (wordChunk ? ' ' : '') + word;
            }
          }

          if (wordChunk) {
            chunks.push(wordChunk.trim());
          }
        } else {
          sentenceChunk += (sentenceChunk ? ' ' : '') + sentence;
        }
      }

      if (sentenceChunk) {
        chunks.push(sentenceChunk.trim());
      }
    } else if (
      estimateTokens(currentChunk + paragraph) > maxTokens &&
      currentChunk.length > 0
    ) {
      chunks.push(currentChunk.trim());
      currentChunk = paragraph;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + paragraph;
    }
  }

  if (currentChunk.trim().length > 0) {
    chunks.push(currentChunk.trim());
  }

  return chunks;
}

function estimateTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / 4);
}

function trimTextToTokenLimit(text: string, maxTokens: number): string {
  if (estimateTokens(text) <= maxTokens) {
    return text;
  }

  const paragraphs = text.split(/\n\s*\n/);
  let result = '';

  for (const paragraph of paragraphs) {
    if (estimateTokens(result + '\n\n' + paragraph) <= maxTokens) {
      result += (result ? '\n\n' : '') + paragraph;
    } else {
      break;
    }
  }

  return result;
}
