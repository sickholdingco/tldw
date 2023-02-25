import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const summarizeBlock = async (block: string) => {
  const prompt = `Summarize the following paragraph in plain english: '${block}'`;

  const completions = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1024,
  })
  .catch((err) => {
    throw new Error(err);
  });

  return completions.data.choices[0].text;
};

const OpenAIService = { summarizeBlock };
export default OpenAIService;
