import { api } from "@/utils/api";

export const useAnswerQuestion = (question: string) => {
  const embeddingQuery = api.embedding.embedding.useQuery(
    { question },
    { enabled: false },
  );

  return embeddingQuery;
};
