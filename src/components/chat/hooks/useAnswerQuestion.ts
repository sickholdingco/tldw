import { api } from "@/utils/api";

export const useAnswerQuestion = (question: string) => {
  const embeddingQuery = api.embed.useQuery({ question }, { enabled: false });

  return embeddingQuery;
};
