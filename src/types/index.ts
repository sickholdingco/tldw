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
  summary: string;
}

export interface VideoSummary {
  videoId: string;
  title: string;
  thumbnail: string;
  blocks: Block[];
  summaries: Summary[];
}

export interface TranscriptData {
  status: string;
  db_id: string;
  search_videos: VideoSummary[];
}

export type VideoType = {
  id: string;
  title: string;
  thumbnail: string;
  blocks: Block[];
};

export type AnswerType = {
  answer: {
    statusCode: number;
    body: string;
  };
  db_id: string;
};

export type Message = {
  content: string;
  isUser: boolean;
  id: string;
};
