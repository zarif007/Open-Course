'use server';

import { z } from 'zod';
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { systemPrompt } from '@/constants/aiCourseCreation';
import { openai } from '@ai-sdk/openai';

const TopicSchema = z.object({
  id: z.number().describe('A unique identifier for the topic'),
  title: z.string().describe('The title of the topic'),
  timeToComplete: z
    .number()
    .describe('The time (in minutes) required to complete the topic'),
  url: z.string().url().describe('The URL to access the topic content'),
});

const AICourseSchema = z.object({
  name: z.string().describe('The name of the AI course'),
  totalTimeTaken: z
    .number()
    .describe('The total time (in minutes) taken to complete the course'),
  topics: z
    .array(TopicSchema)
    .describe('An array of topics included in the course'),
});

const generateAICourse = async (prompt: string) => {
  const { object } = await generateObject({
    model: groq('llama-3.3-70b-versatile'),
    prompt,
    system: systemPrompt,
    output: 'object',
    schema: AICourseSchema,
  });

  return object;
};

export default generateAICourse;
