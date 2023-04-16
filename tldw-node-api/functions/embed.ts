import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const embed = async (text: string) => {
  const response = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });

  return response.data;
};
