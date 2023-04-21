/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import AWS from "aws-sdk";

import type { TranscriptData, AnswerType } from "@/types";

AWS.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const lambda = new AWS.Lambda();

const generateTranscript = async (
  searchTerm: string,
): Promise<TranscriptData> => {
  const params = {
    FunctionName: "tldw-aws-api-dev-youtube_transcript",
    Payload: JSON.stringify({ searchTerm }),
  };

  const result = await lambda.invoke(params).promise();
  const transcript = JSON.parse(result.Payload as string);
  return transcript;
};

const answerQuestion = async (
  question: string,
  db_id: string,
): Promise<AnswerType> => {
  const params = {
    FunctionName: "tldw-node-api-dev-pineconeQuery",
    Payload: JSON.stringify({ question, db_id }),
  };

  const result = await lambda.invoke(params).promise();
  const answerString = JSON.parse(result.Payload as string);
  const answer = {
    answer: answerString,
    db_id,
  };
  return answer;
};

const AwsService = { generateTranscript, answerQuestion };
export default AwsService;
