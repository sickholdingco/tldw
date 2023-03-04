import { NextApiRequest, NextApiResponse } from "next";
import { CreateEmbeddingResponse } from "openai";
import EmbeddingService from "../../services/embedding-service";

interface Data {
  name: CreateEmbeddingResponse;
}

interface Request extends NextApiRequest {
  body: { question: string };
}

const embedding = async (req: Request, res: NextApiResponse<Data>) => {
  const embeddingResponse = await EmbeddingService.generateEmbedding(
    "big poopie",
  );
  res.status(200).json({ name: embeddingResponse });
};

export default embedding;
