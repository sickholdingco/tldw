/* eslint-disable @typescript-eslint/require-await */
import summaries from "mock/summaries";
import { type NextApiRequest, type NextApiResponse } from "next";
import AwsService from "../../server/services/aws/aws-service";
import OpenAIService from "../../server/services/openai/summarize-service";
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
  res.status(200).json({ summaries: summaries });
};

export default summarize;
