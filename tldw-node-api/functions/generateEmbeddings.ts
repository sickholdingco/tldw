import { PineconeClient } from "@pinecone-database/pinecone";
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

interface Block {
  text: string;
}

interface Video {
  blocks: Block[];
}

interface Event {
  search_videos: {
    num_blocks: number;
    db_id: string;
    videos: Video[];
  };
}

// const embed = async (text: string) => {
//   const response = await openai.createEmbedding({
//     model: "text-embedding-ada-002",
//     input: text,
//   });

//   return response.data;
// };

export const handler = async (event: Event) => {
  // const { num_blocks, db_id, videos } = event.search_videos;
  const { num_blocks, videos } = event.search_videos;

  const pinecone = new PineconeClient();

  await pinecone.init({
    environment: process.env.PINECONE_ENVIRONMENT,
    apiKey: process.env.PINECONE_API_KEY,
  });

  if (!(await pinecone.listIndexes()).includes("block-embeddings")) {
    await pinecone.createIndex({
      createRequest: {
        name: "block-embeddings",
        dimension: 1536,
      },
    });
  }

  // const index = pinecone.Index("block-embeddings");

  const numThreads = num_blocks;
  const blocks = videos.flatMap((video) => video.blocks);
  const chunks = chunkArray(blocks, Math.ceil(blocks.length / numThreads));
  const futures = [];

  // for (const chunk of chunks) {
  //   const worker = new Worker(__filename, {
  //     workerData: { blocks: chunk },
  //   });
  //   futures.push(worker);
  // }

  // const results = { embeddings: [] };
  // const embeddings = [];
  // for (const future of futures) {
  //   const result = await new Promise((resolve) => {
  //     future.on("message", resolve);
  //   });

  // embeddings.push(...result);
  // }

  // const embeddings = results.map((embedding, id) => ({
  //   id: `test-${id}`,
  //   vector: embedding.data[0].embedding,
  // }));
  // await index.upsert({ vectors: embeddings, namespace: db_id });
};

function chunkArray<T>(arr: T[], chunkSize: number): T[][] {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}
