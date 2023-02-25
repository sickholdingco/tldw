import { NextApiRequest, NextApiResponse } from "next";
import AwsService from "../../services/aws-service";
import OpenAIService from "../../services/openai-service";

type Data = {
  /// whatever return data we want
}

const summarize = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  // call functions to summartize the transcript
};

export default summarize;
