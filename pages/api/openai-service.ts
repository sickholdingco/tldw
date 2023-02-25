import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateSummary = async (transcript: string) => {
  const model = "text-chat-davinci-002-20230126";
  const text = `Summarize this video transcript:\n\n${transcript}`;

  const completion = await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1.0,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
    })
    .catch((err) => {
      throw new Error(err);
    });

  if (completion.data.choices && completion.data.choices[0]) {
    return completion.data.choices[0].text;
  }

  return "nothing";
};

const OpenAIService = { generateSummary };
export default OpenAIService;