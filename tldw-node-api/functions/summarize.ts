import { Configuration, OpenAIApi } from "openai";
import { backOff } from "./backOff";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const createCompletion = async (prompt: string) => {
  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes sections of a video transcript in concise english.",
      },
      { role: "user", content: prompt },
    ],
  });
};

export const summarize = async (block: string) => {
  const prompt = `"Summarize this section in 1 paragraph:\n${block}"`;
  const completion = await backOff(() => createCompletion(prompt));
  if (completion.data.choices[0].message) {
    return completion.data.choices[0].message.content;
  }

  return "" as string;
};
