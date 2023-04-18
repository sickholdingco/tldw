import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

import { Footer } from "../footer/Footer";
import { Search } from "../search/Search";
import { useGetSummary } from "../search/hooks/useGetSummary";
import { ResultView } from "./ResultView";
import { InitialView } from "./InitialView";
import { Loader } from "../loaders/Loader";

const SummaryView = () => {
  const [selected, setSelected] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isError, isFetching, refetch } =
    useGetSummary(searchInput);

  return (
    <div>
      <div className="flex max-h-[100px] justify-between gap-5 mb-8 pb-6 border-b border-dimmed-600">
        <Footer />

        <Search searchInput={searchInput} setSearchInput={setSearchInput} onSubmit={refetch} />
          <div className="flex w-full justify-end gap-1 max-md:w-auto">
            {data &&
              <>
                {data.summaries.map((summary, i) => (
                  <button
                    key={summary.videoId}
                    onClick={() => {
                      if (selected === i) return;
                      setSelected(i);
                    }}
                    className={clsx(
                      selected === i
                        ? "border-2 border-blueHighlight max-md:hidden max-md:flex-none"
                        : "border-2 border-transparent",
                      "overflow-hidden rounded-lg",
                    )}
                  >
                    <Image
                      src={summary.thumbnail}
                      alt="thumbnail"
                      width={100}
                      height={100}
                    />
                  </button>
                ))}
              </>
            }
          </div>
      </div>

      {isFetching && 
        <Loader />
      }

      {!data &&
        <InitialView />
      }

      {data &&
        <ResultView selected={selected} summaries={data.summaries} />
      }
    </div>
  );
};

export default SummaryView;
