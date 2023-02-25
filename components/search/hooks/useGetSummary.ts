import { useQuery } from "react-query";
import { AWSResponseType, UseGetSummaryResponseType, VideoSummary } from "../../../types/types";

export const useGetSummary = (searchTerm: string) => {  

  const fetchData = async () => {

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
      
      return {
        data: response,
        status: "SUCCESS"
      } as UseGetSummaryResponseType
    } catch (err) {
      console.log(err)
      return {
        data: [],
        status: "FAILURE"
      } as UseGetSummaryResponseType
    }
  };

  return useQuery(["url-service-response"], fetchData, { enabled: false });
};
