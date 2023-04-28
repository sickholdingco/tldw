import * as Separator from "@radix-ui/react-separator";

export const Loader = () => {
  return (
    <div className="flex w-full justify-center max-md:flex-col-reverse max-md:items-center">
      <div className="flex h-full w-full max-w-[50%] flex-col gap-10 overflow-y-auto pr-4 text-left max-md:max-w-full max-md:pr-0">
        <div role="status" className="w-full animate-pulse">
          <div className="mb-4 h-3.5 w-1/2 rounded-full bg-gray-200 dark:bg-gray-700 max-md:w-3/4"></div>
          <div className="mb-2.5 h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700 max-md:w-full"></div>
          <div className="mb-2.5 h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700 max-md:w-full"></div>
          <div className="mb-2.5 h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700 max-md:w-full"></div>
          <div className="mb-2.5 h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700 max-md:w-full"></div>
          <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700 max-md:w-full"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      <Separator.Root
        orientation="vertical"
        className="my-1 w-px bg-dimmed-600 opacity-50"
      />
      <div className="flex h-full w-full max-w-[50%] flex-col gap-4 pl-4 max-md:h-auto max-md:max-w-full max-md:pl-0 max-md:pb-4">
        <div
          role="status"
          className="flex h-56 w-3/4 animate-pulse items-center justify-center rounded-lg bg-gray-300 dark:bg-gray-700 max-md:w-full"
        >
          <svg
            className="h-12 w-12 text-gray-200 dark:text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 384 512"
          >
            <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};
