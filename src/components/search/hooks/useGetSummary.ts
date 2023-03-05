/* eslint-disable @typescript-eslint/consistent-type-imports */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useQuery } from "@tanstack/react-query";
// import { UseGetSummaryResponseType } from "../../../types/types";
import { api } from "@/utils/api";

// export const useGetSummary = (searchTerm: string) => {
//   const fetchData = async () => {
//     try {
//       const response = await (
//         await fetch("/api/summarize", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ searchTerm }),
//         })
//       ).json();
//       console.log(response);
//       return {
//         data: response,
//         status: "SUCCESS",
//       } as UseGetSummaryResponseType;
//     } catch (err) {
//       return {
//         data: [],
//         status: "FAILURE",
//       } as UseGetSummaryResponseType;
//     }
//   };

//   return useQuery(["url-service-response"], fetchData, { enabled: false });
// };

export const useGetSummary = (searchTerm: string) => {
  const summaryQuery = api.summarize.summarize.useQuery(
    { searchTerm },
    { enabled: false },
  );

  return summaryQuery;
};
