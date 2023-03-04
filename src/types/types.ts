import { ChatCompletionResponseMessage } from "openai";

export type OpenAIResponseType = {
  result: string;
};

export type UseGetSummaryResponseType = {
  data: VideoSummary[];
  status: "SUCCESS" | "FAILURE";
};

export interface VideoSummary {
  videoId: string;
  title: string;
  thumbnail: string;
  summaries: ChatCompletionResponseMessage[];
}

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  blocks: string[];
};
