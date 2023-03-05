import { createTRPCRouter } from "@/server/api/trpc";
import { embeddingRouter } from "@/server/api/routers/embedding";
import { summarizeRouter } from "@/server/api/routers/summarize";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  embedding: embeddingRouter,
  summarize: summarizeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
