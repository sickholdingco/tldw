import { summarize } from "./summarize";

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
  const jsonStringBlocks = JSON.stringify(event.blocks);
  const parsedBlocks = JSON.parse(jsonStringBlocks);
  try {
    const summaries: Summary[] = await Promise.all(
      parsedBlocks.map(async (block: Block) => {
        const summaryResponse = await summarize(block.text);
        return {
          blockId: block.blockId,
          summary: summaryResponse,
        };
      }),
    );

    return {
      statusCode: 200,
      body: summaries,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: error,
    };
  }
};
