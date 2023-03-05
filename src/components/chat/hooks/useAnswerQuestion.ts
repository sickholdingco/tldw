/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useQuery } from "react-query";

export const useAnswerQuestion = (question: string) => {
  const fetchData = async () => {
    try {
      const response = await (
        await fetch("/api/embedding", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        })
      ).json();
      console.log(response);
      return {
        data: response,
        status: "SUCCESS",
      } as any;
    } catch (err) {
      return {
        data: [],
        status: "FAILURE",
      } as any;
    }
  };

  return useQuery(["url-service-response"], fetchData, { enabled: false });
};
