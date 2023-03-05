import EmbeddingService from "@/server/services/openai/embedding-service";
// import { embeddingQuestion } from "mock/embeddingResponses";
// import summaries from "mock/summaries";
import { type NextApiRequest, type NextApiResponse } from "next";
// import { type CreateEmbeddingResponse } from "openai";

interface Data {
  name: string;
}

interface Request extends NextApiRequest {
  body: { question: string };
}

const embedding = async (req: Request, res: NextApiResponse<Data>) => {
  const embeddingResponse = await EmbeddingService.generateEmbedding(
    req.body.question,
  );

  // const blocks = summaries.flatMap((summary) => {
  //   return summary.blocks;
  // });

  // const response = await EmbeddingService.getClosestBlockForQuestion(
  //   embeddingQuestion,
  //   blocks,
  // );

  res.status(200).json({ name: "name" });
};

export default embedding;
