import * as Separator from "@radix-ui/react-separator";

import { type VideoSummary } from "@/types";
import YoutubeEmbed from "@/components/youtubeEmbed/youtubeEmbed";

import { Chat } from "../chat/Chat";
import MobileChat from "../MobileChat";

interface ResultViewProps {
  selected: number
  summaries: VideoSummary[]
}

export const ResultView = ({ selected, summaries }: ResultViewProps) => {  
  return (
    <div
      className="flex w-full justify-center max-md:flex-col-reverse max-md:items-center"
      style={{
        height: `calc(100vh - var(--top-section-height))`,
      }}
    >
      <div
        className="flex h-full w-full max-w-[50%] flex-col gap-10 overflow-y-auto pr-4 text-left max-md:max-w-full max-md:pr-0"
        style={{
          scrollbarWidth: "thin",
        }}
      >
        {summaries[selected]?.summaries.map((summary) => (
          // TODO: add bullet points
          <p key={summary.blockId}>poop</p>
        ))}
      </div>
      <Separator.Root
        orientation="vertical"
        className="my-1 w-px bg-dimmed-600 opacity-10"
      />
      <div className="flex h-full w-full max-w-[50%] flex-col gap-4 pl-4 max-md:h-auto max-md:max-w-full max-md:pl-0">
        <div>
          <YoutubeEmbed embedId={summaries[selected]?.videoId} />
        </div>
        <div className="max-md:hidden max-md:flex-none">
          <Chat />
        </div>
        <MobileChat />
      </div>
    </div>
  )
}
