import { Configuration, OpenAIApi } from "openai";
import { backOff } from "../utils/backOff";
import { cosineSimilarity } from "./utils/cosineSimilarity";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const getClosestBlockForQuestion = async (
  question: string,
  blocks: string[],
) => {
  const questionEmbedding = await generateEmbedding(question);
  const blockEmbeddings = await generateEmbeddings(blocks);

  // const distances = blockEmbeddings.map((blockEmbedding) => {
  //   return cosineSimilarity(questionEmbedding, blockEmbedding);
  // }
};

const generateEmbeddings = async (blocks: string[]) => {
  const embeddings = await Promise.all(
    blocks.map(async (block) => {
      return await generateEmbedding(block);
    }),
  );
  return embeddings;
};

const generateEmbedding = async (block: string) => {
  const reponse = await backOff(async () => {
    return await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: block,
    });
  });

  return reponse.data;
};

const EmbeddingService = { generateEmbedding };
export default EmbeddingService;
