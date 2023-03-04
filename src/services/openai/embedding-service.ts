import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateEmbedding = async (text: string) => {
  const reponse = await openai.createEmbedding({
    model: "text-embedding-ada-002",
    input: text,
  });
  return reponse.data;
};

const EmbeddingService = { generateEmbedding };
export default EmbeddingService;
