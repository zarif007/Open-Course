import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { topicGenerationSystemPrompt } from '@/constants/systemPrompts/courseTopicGeneration';
import { scrapeFirstSearchResult } from '@/utils/scrapeSearch';

const AICourseSchema = z.object({
  name: z.string(),
  totalTimeTaken: z.number(),
  topics: z.array(
    z.object({
      title: z.string(),
      from: z.string(),
    })
  ),
});

const model = groq('llama-3.3-70b-versatile');

const generateTopics = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    prompt,
    system: topicGenerationSystemPrompt,
    output: 'object',
    schema: AICourseSchema,
  });

  return object;
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const prompt = body.prompt;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: 'Invalid prompt' }, { status: 400 });
    }

    const { name, topics, totalTimeTaken } = await generateTopics(prompt);

    const enrichedTopics = await Promise.all(
      topics.map(async (topic, index) => {
        const result = await scrapeFirstSearchResult(topic.title, topic.from);
        if (result?.url) {
          return {
            id: index + 1,
            title: topic.title,
            timeToComplete: 0,
            url: result.url,
          };
        }
        return null;
      })
    );

    const filteredTopics = enrichedTopics.filter(Boolean);

    const course = {
      name,
      totalTimeTaken,
      topics: filteredTopics,
    };

    return NextResponse.json(course);
  } catch (error) {
    console.error('Error generating course:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
