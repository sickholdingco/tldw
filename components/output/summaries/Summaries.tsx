import { useState } from "react";

interface SummariesProps {
  summaries: string[];
}

export const Summaries = ({ summaries }: SummariesProps) => {

  return (
   <div className="flex flex-col gap-4">
      {summaries.map((summary, index) => {
        return (
          <div>{summary}</div>
        )
      })}
   </div>
  );
};
