import { CreateEmbeddingResponse } from "openai";

export const cosineSimilarity = (
  embedding1: CreateEmbeddingResponse,
  embedding2: CreateEmbeddingResponse,
) => {
  // const embedding1Data = embedding1?.data;
  // let dotProduct = 0;
  // let mag1 = 0;
  // let mag2 = 0;
  // // for (let i = 0; i < embedding1.length; i++) {
  // //   dotProduct += embedding1?.data[i] * embedding2[i]!;
  // //   mag1 += embedding1[i]! * embedding1[i]!;
  // //   mag2 += embedding2[i]! * embedding2[i]!;
  // // }
  // mag1 = Math.sqrt(mag1);
  // mag2 = Math.sqrt(mag2);
  // return dotProduct / (mag1 * mag2);
};
