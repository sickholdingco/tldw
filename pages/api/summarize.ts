import { NextApiRequest, NextApiResponse } from "next";
import AwsService from "../../services/aws-service";
import OpenAIService from "../../services/openai-service";
import { VideoSummary } from "../../types/types";

type Data = {
  summaries: VideoSummary[]
}

const summarize = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const awsTranscriptResponse = await AwsService.generateTranscript(req.body.searchTerm);
  console.log("in summarize")
  console.log(awsTranscriptResponse)
  const openAiSummaryResponse = await OpenAIService.summarizeVideos(awsTranscriptResponse.videos);

  res.status(200).json({ summaries: openAiSummaryResponse });
};

export default summarize;
