import { useQuery } from "react-query";
import { SummarizeResponse } from "../../../pages/api/summarize";
import { UseGetSummaryResponseType } from "../../../types/types";

export const useGetSummary = (searchTerm: string) => {  

  const fetchData = async () => {
    try {
      const response: SummarizeResponse = await (
        await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        })
      ).json();
      console.log(response)
      return {
        videoSummaries: response.summaries,
        status: "SUCCESS"
      } as UseGetSummaryResponseType
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      return {
        videoSummaries: [],
        status: "FAILURE"
      } as UseGetSummaryResponseType
    }
  };

  return useQuery(["url-service-response"], fetchData, { enabled: false });
};
