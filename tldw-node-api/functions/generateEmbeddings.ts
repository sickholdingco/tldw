/* eslint-disable @typescript-eslint/no-unsafe-call */
import { spawn, Worker } from "threads";
import { PineconeClient } from "@pinecone-database/pinecone";
import { embed } from "./worker";

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

export const generate = async (event: Event) => {
  const { num_blocks, db_id, videos } = event.search_videos;

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

  const workers = new Array(num_blocks);

  // type this better
  const results = { embeddings: [] as number[] };

  for (const vid of videos) {
    for (const block of vid["blocks"]) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
      const worker = await spawn(new Worker("./worker.ts"));
      workers.push(worker);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      worker
        .run(embed, block["text"])
        .then((result) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          results.embeddings.push(result);

          if (results.embeddings.length === num_blocks) {
            // All workers have completed
            return {
              statusCode: 200,
              body: JSON.stringify(results),
            };
          }
        })
        .catch((err) => {
          console.error(`Worker error: ${err}`);
          return {
            statusCode: 500,
            body: JSON.stringify({ error: err.message }),
          };
        });
    }
  }

  // const embeddings = results.embeddings.map((embedding, id) => ({
  //   id: `test-${id}`,
  //   vector: embedding.data[0].embedding,
  // }));

  // figure out how to format this better
  const embeddings: [string, number[]][] = results.embeddings.map(
    (result, id) => [`test-${id}`, result.data[0].embedding],
  );

  const index = pinecone.Index("block-embeddings");
  // find out what upsert takes as params
  await index.upsert({ vectors: embeddings, namespace: db_id });
};
