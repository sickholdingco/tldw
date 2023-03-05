import { useState } from "react";
import { useAnswerQuestion } from "./hooks/useAnswerQuestion";

export const Chat = () => {
  const [searchInput, setSearchInput] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { data, isLoading, isError, isFetching, refetch } =
    useAnswerQuestion(searchInput);

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    refetch();
  };

  return (
    <div className="flex w-full items-center justify-start">
      <button
        className="bg-product-purple w-full rounded-lg py-5 text-[16px] font-medium leading-none"
        type="button"
        onClick={onSubmit}
      >
        {isLoading || isFetching ? (
          <span>loading...</span>
        ) : (
          <span>embedding</span>
        )}
      </button>
    </div>
  );
};
