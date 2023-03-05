import { type Block } from "@/types/types";
import { Configuration, OpenAIApi } from "openai";
import { backOff } from "../utils/backOff";
import { cosineSimilarity } from "./utils/cosineSimilarity";

const configuration = new Configuration({
  organization: "org-qfWtnO1yH4b9t2G8feLxBPsK",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateBlockEmbeddings = async (blocks: Block[]) => {
  const embeddings = await Promise.all(
    blocks.map(async (block) => {
      return {
        embedding: await generateEmbedding(block.text),
        blockId: block.blockId,
      };
    }),
  );
  return embeddings;
};

const generateEmbedding = async (block: string) => {
  // eslint-disable-next-line no-console
  console.log(
    `🦄🦄🦄🦄 ${Date.now().toString()} process.env.OPENAI_API_KEY: ${JSON.stringify(
      process.env.OPENAI_API_KEY,
      null,
      4,
    )}`,
  );
  // eslint-disable-next-line no-console
  console.log(
    `🦄🦄🦄🦄 ${Date.now().toString()} openai: ${JSON.stringify(
      openai,
      null,
      4,
    )}`,
  );

  const reponse = await backOff(async () => {
    return await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: block,
    });
  });

  return reponse.data;
};

const getClosestBlockForQuestion = async (
  question: string,
  blocks: Block[],
) => {
  const questionEmbedding = await generateEmbedding(question);

  // eslint-disable-next-line no-console
  console.log(
    `🦄🦄🦄🦄 ${Date.now().toString()} questionEmbedding: ${JSON.stringify(
      questionEmbedding,
      null,
      4,
    )}`,
  );

  const blockEmbeddings = await generateBlockEmbeddings(blocks);

  // eslint-disable-next-line no-console
  console.log(
    `🦄🦄🦄🦄 ${Date.now().toString()} blockEmbeddings: ${JSON.stringify(
      blockEmbeddings,
      null,
      4,
    )}`,
  );

  // const distances = blockEmbeddings.map((blockEmbedding) => {
  //   return cosineSimilarity(questionEmbedding, blockEmbedding.embedding);
  // });

  // const distances = blockEmbeddings.map((blockEmbedding) => {
  //   return cosineSimilarity(questionEmbedding, blockEmbedding);
  // }
};

const EmbeddingService = { generateEmbedding, getClosestBlockForQuestion };
export default EmbeddingService;
