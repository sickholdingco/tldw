import { NextApiRequest, NextApiResponse } from "next";
import AwsService from "../../services/aws-service";
import OpenAIService from "../../services/openai-service";
import { VideoSummary } from "../../types/types";

type Data = {
  summaries: VideoSummary[]
}

const summarize = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // eslint-disable-next-line no-console
  console.log(`🦄🦄🦄🦄 ${Date.now().toString()} req: ${JSON.stringify(req, null, 4)}`);

  const awsTranscriptResponse = await AwsService.generateTranscript(req.body.searchTerm);

  // eslint-disable-next-line no-console
  console.log(`🦄🦄🦄🦄 ${Date.now().toString()} awsTranscriptResponse: ${JSON.stringify(awsTranscriptResponse, null, 4)}`);

  const openAiSummaryResponse = await OpenAIService.summarizeVideos(awsTranscriptResponse.result.vids);

  // eslint-disable-next-line no-console
  console.log(`🦄🦄🦄🦄 ${Date.now().toString()} openAiSummaryResponse: ${JSON.stringify(openAiSummaryResponse, null, 4)}`);

  res.status(200).json({ summaries: openAiSummaryResponse });
};

export default summarize;
