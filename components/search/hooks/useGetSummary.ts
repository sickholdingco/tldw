import { useQuery } from "react-query";
import { AWSResponseType, UseGetSummaryResponseType, VideoSummary } from "../../../types/types";

export const useGetSummary = (searchTerm: string) => {  
  // eslint-disable-next-line no-console
  console.log(`🦄🦄🦄🦄 ${Date.now().toString()} in useGetSummary`);

  const fetchData = async () => {
    // eslint-disable-next-line no-console
    console.log(`🦄🦄🦄🦄 ${Date.now().toString()} in fetchData`);
    try {
      const response = await (
        await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ searchTerm }),
        })
      ).json();

      // eslint-disable-next-line no-console
      console.log(`🦄🦄🦄🦄 ${Date.now().toString()} response: ${JSON.stringify(response, null, 4)}`);
      
      return {
        data: response,
        status: "SUCCESS"
      } as UseGetSummaryResponseType
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`🦄🦄🦄🦄 ${Date.now().toString()} err: ${err}`);
      return {
        data: [],
        status: "FAILURE"
      } as UseGetSummaryResponseType
    }
  };

  return useQuery(["url-service-response"], fetchData, { enabled: false });
};
