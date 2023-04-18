import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";

import AwsService from "../services/aws/aws-service";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  summarize: publicProcedure
    .input(
      z.object({
        searchTerm: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const summaries = await AwsService.generateTranscript(input.searchTerm);

      try {
        return {
          summaries,
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
