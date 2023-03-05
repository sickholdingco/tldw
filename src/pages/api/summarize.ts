/* eslint-disable @typescript-eslint/require-await */
import transcript from "mock/summaries";
import { type NextApiRequest, type NextApiResponse } from "next";
import AwsService from "../../services/aws/aws-service";
import OpenAIService from "../../services/openai/summarize-service";
import { type VideoSummary } from "../../types/types";

interface Data {
  summaries: VideoSummary[];
}

interface Request extends NextApiRequest {
  body: { searchTerm: string };
}

const summarize = async (req: Request, res: NextApiResponse<Data>) => {
  /*
  const awsTranscriptResponse = await AwsService.generateTranscript(
    req.body.searchTerm,
  );

  const openAiSummaryResponse = await OpenAIService.summarizeVideos(
    awsTranscriptResponse,
  );
  */
  res.status(200).json({ summaries: transcript });
};

export default summarize;
