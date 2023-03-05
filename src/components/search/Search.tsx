/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useGetSummary } from "./hooks/useGetSummary";

export const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading, isError, isFetching, refetch } =
    useGetSummary(searchInput);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch();
  };

  return (
    <div className="flex w-full items-center justify-start">
      <form
        className="flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-[5px]">
          <input
            className="form-control
          border-product-purple
          m-0
          block
          w-full
          rounded-lg
          border
          border-solid
          bg-[#2d2d2d] px-4 py-2
          text-[16px]
          font-normal
          transition
          ease-in-out
          focus:outline-none
          "
            placeholder="search me as if it were youtube"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="url-input"
          />
        </div>
        <button
          className="bg-product-purple w-full rounded-lg py-5 text-[16px] font-medium leading-none"
          type="button"
          onClick={onSubmit}
        >
          {isLoading || isFetching ? (
            <span>loading...</span>
          ) : (
            <span>search</span>
          )}
        </button>
      </form>
    </div>
  );
};
