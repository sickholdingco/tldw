import { api } from "@/utils/api";

export const useGetSummary = (searchTerm: string) => {
  const summaryQuery = api.summarize.summarize.useQuery(
    { searchTerm },
    { enabled: false },
  );

  return summaryQuery;
};
