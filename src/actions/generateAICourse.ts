'use server';

import { z } from 'zod';
import { generateObject } from 'ai';
import { groq } from '@ai-sdk/groq';
import { openai } from '@ai-sdk/openai';
import { topicGenerationSystemPrompt } from '@/constants/systemPrompts/courseTopicGeneration';

const AICourseSchema = z.object({
  title: z.string(),
  totalTimeTaken: z.number(),
  contents: z
    .array(
      z.object({
        checkpointName: z.string(),
        topics: z
          .array(
            z.object({
              title: z.string(),
              queryStr: z.string(),
            })
          )
          .min(4)
          .max(5),
      })
    )
    .min(5)
    .max(6),
  categories: z.array(z.string()),
  languages: z.array(z.string()),
  levels: z.array(z.string()),
});

const model = openai('o4-mini');

const generateTopics = async (prompt: string) => {
  const { object } = await generateObject({
    model,
    prompt,
    temperature: 1,
    system: topicGenerationSystemPrompt,
    output: 'object',
    schema: AICourseSchema,
  });

  return object;
};

const convertCourse = (course: z.infer<typeof AICourseSchema>) => {
  let courseMeta = {
    title: course.title,
    totalTimeTaken: course.totalTimeTaken,
    categories: course.categories,
    languages: course.languages,
    levels: course.levels,
  };

  const topics: { title: string; queryStr: string }[] = [];
  const checkPoints = course.contents.map((checkpoint, index) => {
    const checkPointObj = {
      topicID: topics.length + 1,
      checkPointID: index + 1,
      name: checkpoint.checkpointName,
    };

    topics.push(...checkpoint.topics);
    return checkPointObj;
  });

  return {
    ...courseMeta,
    topics,
    checkPoints,
  };
};

const generateAICourse = async (prompt: string) => {
  try {
    const course = await generateTopics(prompt);
    const courseMeta = convertCourse(course);
    return courseMeta;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default generateAICourse;
