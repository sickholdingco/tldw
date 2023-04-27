import * as Separator from "@radix-ui/react-separator";

import { type VideoSummary } from "@/types";
import YoutubeEmbed from "@/components/youtubeEmbed/youtubeEmbed";

import { Chat } from "../chat/Chat";
import MobileChat from "../MobileChat";

interface ResultViewProps {
  db_id: string;
  selected: number;
  videos: VideoSummary[];
}

export const ResultView = ({ selected, videos, db_id }: ResultViewProps) => {
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
        <ul className="list-inside list-none text-dimmed-200">
          {videos[selected]?.summaries.map((summary) => (
            <li key={summary.blockId}>{summary.summary}</li>
          ))}
        </ul>
      </div>
      <Separator.Root
        orientation="vertical"
        className="my-1 w-px bg-dimmed-600 opacity-50"
      />
      <div className="flex h-full w-full max-w-[50%] flex-col gap-4 pl-4 max-md:h-auto max-md:max-w-full max-md:pl-0">
        <div>
          <YoutubeEmbed embedId={videos[selected]?.videoId} />
        </div>
        <div className="flex-1 overflow-y-auto max-md:hidden max-md:flex-none">
          <Chat db_id={db_id} />
        </div>
        <MobileChat />
      </div>
    </div>
  );
};
