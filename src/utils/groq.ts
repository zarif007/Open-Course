import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const reqGroqAI = async (content: any) => {
  const res = await groq.chat.completions.create({
    messages: [
      {
        role: 'user',
        content,
      },
    ],
    model: 'llama-3.3-70b-versatile',
  });
  return res;
};
