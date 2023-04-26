import { PineconeClient, QueryRequest } from "@pinecone-database/pinecone";
import { chat } from "./chat";
import { embed } from "./embed";
const AWS = require("aws-sdk");

interface Message {
  content: string;
  isUser: boolean;
  id: string;
}
interface Event {
  db_id: string;
  messages: Message[];
}

const indexName = "block-embeddings";

export const generate = async (event: Event) => {
  console.log("Messages");
  console.log(event.messages);
  const lambda = new AWS.Lambda();
  const pinecone = new PineconeClient();
  // Initialize the client
  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT,
    apiKey: process.env.PINECONE_API_KEY,
  });

  const list = await pinecone.listIndexes();
  if (!list.includes(indexName)) {
    const createRequest = {
      name: indexName,
      dimension: 1536,
    };

    await pinecone.createIndex({ createRequest });
  }
  const index = pinecone.Index(indexName);

  const embedding = await embed("test");

  const queryRequest: QueryRequest = {
    topK: 1,
    vector: embedding.data[0].embedding as number[],
    namespace: event.db_id,
    includeMetadata: true,
    includeValues: true,
  };

  const queryResponse = await index.query({ queryRequest });
  const matchingBlockId = queryResponse.matches[0].id;

  const params = {
    FunctionName: "tldw-db-api-dev-getTopicInfo",
    InvocationType: "RequestResponse",
    Payload: JSON.stringify({
      pathParameters: {
        id: event.db_id,
      },
    }),
  };

  const response = await lambda.invoke(params).promise();
  const parsedPayload = JSON.parse(response.Payload);
  const parsedBody = JSON.parse(parsedPayload.body);
  const parsedSearch = JSON.parse(parsedBody.search_videos);

  for (const vid of parsedSearch) {
    for (const block of vid.blocks) {
      if (block.blockId.toString() === matchingBlockId) {
        const answer = await chat("test", block.text);
        return {
          statusCode: 200,
          body: JSON.stringify(answer),
        };
      }
    }
  }
  return {
    statusCode: 200,
    body: "No matching block found",
  };
};
