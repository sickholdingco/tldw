import { z } from "zod";
import summaries from "mock/summaries";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const summarizeRouter = createTRPCRouter({
  summarize: publicProcedure
    .input(z.object({ searchTerm: z.string() }))
    .query(async ({ input }) => {
      return {
        summaries: summaries,
      };
    }),
});
