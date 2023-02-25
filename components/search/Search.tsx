import { useState } from "react";
import { useGetSummary } from "./hooks/useGetSummary";

export const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  // eslint-disable-next-line no-console
  console.log(`🦄🦄🦄🦄 ${Date.now().toString()} searchInput: ${JSON.stringify(searchInput, null, 4)}`);

  const { data, isLoading, isError, isFetching, refetch } = useGetSummary(searchInput);

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    refetch();
  };
  
  return (
    <div className="w-full flex justify-start items-center">
      <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-col gap-[5px]">
          <textarea
            className="form-control
          block
          w-full
          px-4
          py-2
          text-[16px]
          font-normal
          bg-[#2d2d2d]
          border border-solid border-product-purple
          rounded-lg
          transition
          ease-in-out
          m-0
          focus:outline-none
          "
            placeholder="search me as if it were youtube"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            id="url-input"
            rows={1}
          />
        </div>
          <button
          className="w-full bg-product-purple rounded-lg py-5 text-[16px] font-medium leading-none"
          type="button"
          onClick={onSubmit}>
          {isLoading || isFetching ? <span>loading...</span> : <span>search</span>}
        </button>
      </form>
    </div>
  );
};