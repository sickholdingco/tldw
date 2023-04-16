import { PineconeClient, UpsertRequest } from "@pinecone-database/pinecone";
import { UpsertOperationRequest } from "@pinecone-database/pinecone/dist/pinecone-generated-ts-fetch/apis";
import { embed } from "./embed";

interface Block {
  blockId: number;
  text: string;
}

interface Video {
  id: string;
  title: string;
  thumbnail: string;
  blocks: Block[];
}

interface Event {
  db_id: string;
  num_blocks: number;
  search_videos: Video[];
}

interface Embedding {
  embedding: number[];
  blockId: number;
}

interface Vector {
  id: string;
  values: number[];
}

export const generate = async (event: Event) => {
  const db_id = event.db_id;

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

  const results = { embeddings: [] as Embedding[] };

  for (const vid of event.search_videos) {
    for (const block of vid.blocks) {
      const embedding = await embed(block.text);
      results.embeddings.push({
        embedding: embedding.data[0].embedding as number[],
        blockId: block.blockId,
      });
    }
  }

  const embeddingVectors: Vector[] = [];
  for (const embedding of results.embeddings) {
    embeddingVectors.push({
      id: embedding.blockId.toString(),
      values: embedding.embedding,
    });
  }

  const upsertParams = {
    vectors: embeddingVectors,
    namespace: db_id,
  };

  const index = pinecone.Index("block-embeddings");
  await index.upsert({ upsertRequest: upsertParams });
};
