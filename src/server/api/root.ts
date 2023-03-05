import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import EmbeddingService from "@/server/services/openai/embedding-service";
import { z } from "zod";
import summaries from "@/mock/summaries";
import { TRPCError } from "@trpc/server";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  embed: publicProcedure
    .input(
      z.object({
        question: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const embeddingResponse = await EmbeddingService.generateEmbedding(
          "big poopie",
        );

        return {
          embedding: embeddingResponse,
        };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to generate embedding",
        });
      }
    }),
  summarize: publicProcedure
    .input(
      z.object({
        searchTerm: z.string(),
      }),
    )
    .query(({ input }) => {
      try {
        return {
          summaries: summaries,
        };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch summary",
        });
      }
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
