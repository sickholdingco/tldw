import { z } from "zod";
import EmbeddingService from "@/server/services/openai/embedding-service";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const embeddingRouter = createTRPCRouter({
  embedding: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ input }) => {
      const embeddingResponse = await EmbeddingService.generateEmbedding(
        "big poopie",
      );
      return {
        name: embeddingResponse,
      };
    }),
});
