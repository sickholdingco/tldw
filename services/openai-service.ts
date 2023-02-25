import { Configuration, OpenAIApi } from "openai";
import { VideoSummary, VideoType } from "../types/types";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const summarizeVideos = async (videos: VideoType[]): Promise<VideoSummary[]> => {
  const videoSummaries: VideoSummary[] = await Promise.all(videos.map(async (video) => {
    return {
      videoId: video.id,
      title: video.title,
      thumbnail: video.thumbnail,
      summaries: await Promise.all(video.blocks.map(async (block) => {
        const summary = await summarizeBlock(block);
        return summary;
      }))
    }
  }));

  return videoSummaries;
}

const summarizeBlock = async (block: string): Promise<string> => {
  const prompt = `Summarize the following paragraph in plain english: '${block}'`;

  const completions = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    max_tokens: 1024,
  })
  .catch((err) => {
    throw new Error(err);
  });

  return completions.data.choices[0].text || "";
};

const OpenAIService = { summarizeVideos };
export default OpenAIService;
