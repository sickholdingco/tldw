import * as Separator from "@radix-ui/react-separator";
import { transcript } from "../../../mock/transcript";
import YoutubeEmbed from "@/components/youtubeEmbed/youtubeEmbed";
import Image from "next/image";
import { useState } from "react";
import { clsx } from "clsx";

const videoDisplay = () => {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="mb-3 flex justify-center gap-5">
        {transcript.summaries.map((s, i) => (
          <button
            onClick={() => {
              if (selected === i) return;
              setSelected(i);
            }}
            className={clsx(
              selected === i
                ? "border-2 border-red-700"
                : "border-2 border-transparent",
              "rounded-lg",
            )}
          >
            <Image src={s.thumbnail} alt="thumbnail" width={100} height={100} />
          </button>
        ))}
      </div>
      <div className="flex w-full justify-center gap-3">
        <div className="flex w-full max-w-[50%] flex-col gap-10 text-left">
          {transcript.summaries[selected].summaries.map((s) => (
            <p>{s.content}</p>
          ))}
        </div>
        <Separator.Root orientation="vertical" className="w-px bg-red-700" />
        <div className="flex w-full max-w-[50%] flex-col gap-4">
          <div>
            <YoutubeEmbed embedId={transcript.summaries[selected].videoId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default videoDisplay;