export type OpenAIResponseType = {
  result: string;
};

export type UseGetSummaryResponseType = {
  videoSummaries: VideoSummary[];
  status: "SUCCESS" | "FAILURE";
};

export interface VideoSummary {
  videoId: string;
  title: string;
  thumbnail: string;
  summaries: string[];
}

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  blocks: string[];
}
