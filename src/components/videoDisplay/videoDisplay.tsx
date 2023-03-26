import * as Separator from "@radix-ui/react-separator";
import { summaries } from "@/mock/summaries";
import YoutubeEmbed from "@/components/youtubeEmbed/youtubeEmbed";
import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";
import { Footer } from "../footer/Footer";
import { Chat } from "../chat/Chat";

const VideoDisplay = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="mb-3 flex max-h-[100px] justify-between gap-5">
        <Footer />
        <div className="flex w-full justify-end gap-1">
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
        </div>
      </div>

      <div
        className="flex w-full justify-center max-md:flex-col-reverse max-md:items-center"
        style={{
          height: `calc(100vh - var(--top-section-height))`,
        }}
      >
        <div
          className="flex h-full w-full max-w-[50%] flex-col gap-10 overflow-y-auto pr-4 text-left max-md:max-w-full"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {summaries[selected]?.summaries.map((summary) => (
            <p key={summary.blockId}>{summary.summary.content}</p>
          ))}
        </div>
        <Separator.Root
          orientation="vertical"
          className="my-1 w-px bg-white opacity-10"
        />
        <div className="flex h-full w-full max-w-[50%] flex-col gap-4 pl-4 max-md:max-w-full">
          <div>
            <YoutubeEmbed embedId={summaries[selected]?.videoId} />
          </div>
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default VideoDisplay;
