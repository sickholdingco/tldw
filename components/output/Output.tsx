import { VideoSummary } from "../../types/types";
import { Summaries } from "./summaries/Summaries";
import { Video } from "./video/Video";

interface OutputProps {
  videoSummaries: VideoSummary[];
}

export const Output = ({ videoSummaries }: OutputProps) => {  
  return (
   <div>
      {videoSummaries.map((videoSummary, index) => {
        return (
          <div className="grid grid-cols-2 gap-6">
            <Summaries summaries={videoSummary.summaries} />
            <Video videoId={videoSummary.videoId} title={videoSummary.title} thumbnail={videoSummary.thumbnail} />
          </div>
        )
      })}
   </div>
  );
};
