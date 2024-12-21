import { GoogleGenerativeAI } from '@google/generative-ai';

export const getAI = async (prompt: string) => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? '');
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

  const result = await model.generateContent(prompt);
  console.log(result.response.text());

  return result.response.text();
};
