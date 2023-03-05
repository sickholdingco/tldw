import {
  ChatCompletionResponseMessage,
  Configuration,
  OpenAIApi,
} from "openai";
import { VideoSummary, VideoType } from "../../types/types";
import { backOff } from "../utils/backOff";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const summarizeVideos = async (
  videos: VideoType[],
): Promise<VideoSummary[]> => {
  const videoSummaries: VideoSummary[] = await Promise.all(
    videos.map(async (video) => {
      return {
        videoId: video.id,
        title: video.title,
        thumbnail: video.thumbnail,
        blocks: video.blocks,
        summaries: await Promise.all(
          video.blocks.map(async (block) => {
            const summary = await summarizeBlock(block.text);
            return {
              blockId: block.blockId,
              summary,
            };
          }),
        ),
      };
    }),
  );

  return videoSummaries;
};

const summarizeBlock = async (
  block: string,
): Promise<ChatCompletionResponseMessage> => {
  const prompt = `"Summarize this section in 1 paragraph:\n${block}"`;

  const completion = await backOff(() => createCompletion(prompt));

  if (completion.data.choices[0].message) {
    return completion.data.choices[0].message;
  }

  return "" as unknown as ChatCompletionResponseMessage;
};

const createCompletion = async (prompt: string) => {
  return await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that summarizes sections of a video transcript in concise english.",
      },
      { role: "user", content: prompt },
    ],
  });
};

const OpenAIService = { summarizeVideos };
export default OpenAIService;
