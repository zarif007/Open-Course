'use server';

import { z } from 'zod';
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { systemPrompt } from '@/constants/systemPrompts/aiCourseCreation';
import { topicGenerationSystemPrompt } from '@/constants/systemPrompts/courseTopicGeneration';
import { scrapeFirstSearchResult } from './scrapeSearch';

interface Topic {
  id: number; // A unique identifier for the topic
  title: string; // The title of the topic
  timeToComplete: number; // The time (in minutes) required to complete the topic
  url: string; // The URL to access the topic content
}

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

const model = groq('llama-3.3-70b-versatile');

const generateTopics = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    prompt,
    system: topicGenerationSystemPrompt,
    output: 'array',
    schema: z.array(z.string()).min(9).max(12),
  });

  return object;
};

const generateAICourse = async (prompt: string) => {
  const res = await generateTopics(prompt);
  const topics = res[0];
  console.log(topics);
  const urls: Topic[] = [];
  await Promise.all(
    topics.map(async (topic, index) => {
      const searchResult = await scrapeFirstSearchResult(topic);
      if (searchResult?.url) {
        urls.push({
          id: index,
          title: topic,
          timeToComplete: 0,
          url: searchResult.url,
        });
      }
    })
  );

  console.log(urls);

  return { name: prompt, topics: urls, totalTimeTaken: 0 };
};

export default generateAICourse;
