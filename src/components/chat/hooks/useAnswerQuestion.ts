import { api } from "@/utils/api";
import type { Message } from "@/types";
export const useAnswerQuestion = (messages: Message[], db_id: string) => {
  const embeddingQuery = api.answer.useQuery(
    { messages, db_id },
    { enabled: false },
  );

  return embeddingQuery;
};
