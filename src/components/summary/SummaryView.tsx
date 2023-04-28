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

  console.log("poop");

  return (
    <div>
      <div className="mb-8 flex h-[100px] max-h-[100px] justify-between gap-5 border-b border-dimmed-600 pb-6">
        <Footer />

        <Search
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={refetch}
        />
        <div className="flex w-full justify-end gap-1 max-md:w-auto">
          {isError ||
            (data && data.transcriptData.status === "error" && (
              <div className="text-red-500">Error</div>
            ))}
          {data &&
            data.transcriptData.status === "success" &&
            !isError &&
            !isFetching && (
              <>
                {data.transcriptData.search_videos.map((video, i) => (
                  <button
                    key={video.videoId}
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
                      src={video.thumbnail}
                      alt="thumbnail"
                      width={100}
                      height={100}
                    />
                  </button>
                ))}
              </>
            )}
        </div>
      </div>

      {isFetching && <Loader />}

      {!data && !isFetching && <InitialView />}

      {data && !isError && data.transcriptData.status === "success" && (
        <ResultView
          selected={selected}
          videos={data.transcriptData.search_videos}
          db_id={data.transcriptData.db_id}
        />
      )}
    </div>
  );
};

export default SummaryView;
