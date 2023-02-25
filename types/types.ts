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
  summaries: string[];
}

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  blocks: string[];
}

export type AWSResponseType = {
  result: {
    vids: VideoType[];
    numBlocks: number;
  }
};
