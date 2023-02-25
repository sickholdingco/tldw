import AWS from "aws-sdk";

AWS.config.update({
	region: process.env.AWS_REGION,
	accessKeyId: process.env.AWS_ACCESS_KEY_ID,
	secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const lambda = new AWS.Lambda();

const generateTranscript = async (url: string) => {
	const params = {
		FunctionName: 'youtube-transcript',
		Payload: JSON.stringify({ url: url }),
	};
	const result = await lambda.invoke(params).promise();
	const transcript = JSON.parse(result.Payload as string);
	return transcript;
}

const AwsService = { generateTranscript };
export default AwsService;