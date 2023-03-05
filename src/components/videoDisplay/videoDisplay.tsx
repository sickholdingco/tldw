import * as Separator from "@radix-ui/react-separator";
import { summaries } from "../../../mock/summaries";
import YoutubeEmbed from "@/components/youtubeEmbed/youtubeEmbed";
import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

const videoDisplay = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="mb-3 flex justify-center gap-5">
        {summaries.map((summary, i) => (
          <button
            key={summary.videoId}
            onClick={() => {
              if (selected === i) return;
              setSelected(i);
            }}
            className={clsx(
              selected === i
                ? "border-2 border-red-700 max-md:hidden"
                : "border-2 border-transparent",
              "rounded-lg",
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
      </div>

      <div className="flex w-full justify-center gap-3 max-md:flex-col-reverse max-md:items-center">
        <div className="flex w-full max-w-[50%] flex-col gap-10 text-left max-md:max-w-full">
          {summaries[selected].summaries.map((summary) => (
            <p>{summary.summary.content}</p>
          ))}
        </div>
        <Separator.Root orientation="vertical" className="w-px bg-red-700" />
        <div className="flex w-full max-w-[50%] flex-col gap-4 max-md:max-w-full">
          <div>
            <YoutubeEmbed embedId={summaries[selected].videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default videoDisplay;
