import {
  backOff as exponentialBackOff,
  type IBackOffOptions,
} from "exponential-backoff";

export const backOff = async <T>(
  request: () => Promise<T>,
  options?: Partial<IBackOffOptions> | undefined,
) => {
  return await exponentialBackOff(
    () => request(),
    options
      ? options
      : {
          numOfAttempts: 4,
          maxDelay: 10000,
          retry: () => {
            console.log("🦄🦄🦄🦄 retrying... 🦄🦄🦄🦄");
            return true;
          },
        },
  ).catch((err) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    throw new Error(err);
  });
};
