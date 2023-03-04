import {
  backOff as exponentialBackOff,
  IBackOffOptions,
} from "exponential-backoff";

export const backOff = async <T>(
  request: () => Promise<T>,
  options?: Partial<IBackOffOptions> | undefined,
) => {
  return await exponentialBackOff(
    () => request(),
    options ?? {
      numOfAttempts: 4,
      maxDelay: 10000,
      retry: () => {
        console.log("🦄🦄🦄🦄 retrying... 🦄🦄🦄🦄");
        return true;
      },
    },
  ).catch((err) => {
    throw new Error(err);
  });
};
