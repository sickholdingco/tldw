import { api } from "@/utils/api";

export const useAnswerQuestion = (question: string, db_id: string) => {
  const embeddingQuery = api.answer.useQuery(
    { question, db_id },
    { enabled: false },
  );

  return embeddingQuery;
};
