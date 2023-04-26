import { summarize } from "./summarize";
import async from "async";

interface Block {
  blockId: number;
  text: string;
}

interface Summary {
  blockId: number;
  summary: string;
}

interface Event {
  blocks: string;
}

export const generate = async (event: Event) => {
  try {
    const jsonStringBlocks = JSON.stringify(event.blocks);
    const parsedBlocks = JSON.parse(jsonStringBlocks);

    const summaries: Summary[] = await new Promise((resolve, reject) => {
      async.mapLimit(
        parsedBlocks,
        10,
        async (block: Block, callback) => {
          try {
            const summaryResponse = await summarize(block.text);
            const summary = {
              blockId: block.blockId,
              summary: summaryResponse,
            };
            callback(null, summary);
          } catch (error) {
            console.error("Error in summarize:", error);
            callback(error);
          }
        },
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        },
      );
    });

    return {
      statusCode: 200,
      body: summaries,
    };
  } catch (error) {
    console.error("Error in generate:", error);
    return {
      statusCode: 500,
      body: error,
    };
  }
};
