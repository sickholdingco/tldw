import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import Mock from "../../mock.json";
import AwsService from "../services/aws/aws-service";
import { type TranscriptData } from "@/types";

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
      try {
        const transcriptData = await AwsService.generateTranscript(
          input.searchTerm,
        );
        return {
          transcriptData,
        };
      } catch (err) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to fetch summary",
        });
      }
    }),
  answer: publicProcedure
    .input(
      z.object({
        question: z.string(),
        db_id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      try {
        const answer = await AwsService.answerQuestion(
          input.question,
          input.db_id,
        );
        // const data = {
        //   statusCode: 200,
        //   body: "\"Based on the given context, it is the author's opinion that Michael O'Hearn is not a natural bodybuilder and is most likely using steroids. However, the author acknowledges that O'Hearn has worked hard and has good genetics.\"",
        // };
        return {
          answer,
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
