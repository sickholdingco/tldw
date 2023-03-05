import { ChatCompletionResponseMessage } from "openai";

export type OpenAIResponseType = {
  result: string;
};

export type UseGetSummaryResponseType = {
  data: VideoSummary[];
  status: "SUCCESS" | "FAILURE";
};

export interface Block {
  blockId: number;
  text: string;
}

export interface Summary {
  blockId: number;
  summary: ChatCompletionResponseMessage;
}

export interface VideoSummary {
  videoId: string;
  title: string;
  thumbnail: string;
  blocks: Block[];
  summaries: Summary[];
}

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  blocks: Block[];
};
