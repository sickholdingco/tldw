import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const chat = async (question: string, text: string) => {
  const answer = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful chat bot that answers a question in a concise manner given a paragraph of text as context.",
      },
      {
        role: "user",
        content: question + "\n Context: \n" + text,
      },
    ],
  });
  return answer.data.choices[0].message.content;
};
