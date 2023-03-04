import { NextApiRequest, NextApiResponse } from "next";
import AwsService from "../../services/aws-service";
import OpenAIService from "../../services/openai-service";
import { VideoSummary } from "../../types/types";

interface Data {
  summaries: VideoSummary[];
}

interface Request extends NextApiRequest {
  body: { searchTerm: string };
}

const summarize = async (req: Request, res: NextApiResponse<Data>) => {
  const awsTranscriptResponse = await AwsService.generateTranscript(
    req.body.searchTerm,
  );
  console.log(awsTranscriptResponse)
  const openAiSummaryResponse = await OpenAIService.summarizeVideos(
    awsTranscriptResponse,
  );

  res.status(200).json({ summaries: openAiSummaryResponse });
};

export default summarize;
