export type OpenAIResponseType = {
  result: string;
};

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

export type UseQueryResponseType = {
  data: VideoType[];
  status: "SUCCESS" | "FAILURE";
};
