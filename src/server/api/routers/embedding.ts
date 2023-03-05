import { z } from "zod";
import EmbeddingService from "@/server/services/openai/embedding-service";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const embeddingRouter = createTRPCRouter({
  embedding: publicProcedure
    .input(z.object({ question: z.string() }))
    .query(async ({ input }) => {
      try {
        const embeddingResponse = await EmbeddingService.generateEmbedding(
          "big poopie",
        );
        return {
          data: embeddingResponse,
          status: "SUCCESS",
        };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch embedding",
        });
      }
    }),
});
