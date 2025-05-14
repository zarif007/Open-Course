'use server';

import { z } from 'zod';
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { topicGenerationSystemPrompt } from '@/constants/systemPrompts/courseTopicGeneration';

const AICourseSchema = z.object({
  title: z.string(),
  totalTimeTaken: z.number(),
  topics: z
    .array(
      z.object({
        title: z.string(),
        from: z.string(),
      })
    )
    .min(10)
    .max(30),
  categories: z.array(z.string()),
  languages: z.array(z.string()),
  levels: z.array(z.string()),
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

const generateAICourse = async (prompt: string) => {
  try {
    const course = await generateTopics(prompt);
    return course;
  } catch (error) {
    return null;
  }
};

export default generateAICourse;
