import { useQuery } from "react-query";
import { AWSResponseType, OpenAIResponseType, UseQueryResponseType } from "../config/types";
//import { splitTranscript } from "../helpers/openAIHelper";

export const useGetServiceData = (url: string) => {  
  const fetchData = async () => {

    try {
      const awsTranscriptResponse: AWSResponseType = await (
        await fetch("/api/transcript", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({url})
        })
      ).json();

      console.log(awsTranscriptResponse.result)
      
      return {
        data: awsTranscriptResponse.result.vids,
        status: "SUCCESS"
      } as UseQueryResponseType
      // const numberOfParts = Math.ceil((awsTranscriptResponse.result.length/4) / 3600);
      // const result = splitTranscript(awsTranscriptResponse.result, numberOfParts);
      // const openAiResponses: string[] = [];

      // result.forEach(async (transcript: string) => {

      //   const response: OpenAIResponseType = await (
      //     await fetch("/api/generate", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({transcript}),
      //     })
      //   ).json();
      //   console.log(response.result);
      //   openAiResponses.push(response.result);
      // });

      // console.log(openAiResponses.filter(str => str.trim() !== '').join('\n'));

      /*
      Currently have the transcript split up into the appropriate num of parts. Next need to do some regex to find out if each part ends in a sentence, and if it doesn't, append to the front of the next section. Then, I need to cycle through each section, 
      make an api call to OpenAI, and once I have all the responses congregate into one final OpenAI call.
      */

      // if (awsTranscriptResponse.result.length/4 < 3600) {
      //   const transcript = awsTranscriptResponse.result;
      //   const response: OpenAIResponseType = await (
      //     await fetch("/api/generate", {
      //       method: "POST",
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //       body: JSON.stringify({transcript}),
      //     })
      //   ).json();
      //   return {
      //     data: response.result,
      //     status: "SUCCESS",
      //   } as UseQueryResponseType;
      // } else {
      //   return {
      //     data: "length error",
      //     status: "FAILURE"
      //   }
      // }
    } catch (err) {
      return {
        data: [],
        status: "FAILURE"
      } as UseQueryResponseType
    }
  };

  return useQuery(["url-service-response"], fetchData, { enabled: false });
};
