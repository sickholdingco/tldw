import * as Separator from "@radix-ui/react-separator";
import { summaries } from "@/mock/summaries";
import YoutubeEmbed from "@/components/youtubeEmbed/youtubeEmbed";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { clsx } from "clsx";

const videoUrls = summaries.map((summary) => summary.videoId);

const VideoDisplay = () => {
  const [selected, setSelected] = useState(0);

  const scrollSectionRef = useRef<HTMLDivElement>(null);

  const [reachedBottom, setReachedBottom] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  const [disableScroll, setDisableScroll] = useState(false);

  useEffect(() => {
    const bottom = bottomRef.current;
    let timer: ReturnType<typeof setTimeout> | undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (scrollSectionRef?.current) {
              scrollSectionRef.current.scrollTop = 0;
              setSelected((prev) => {
                if (prev === summaries.length - 1) {
                  return 0;
                }
                return prev + 1;
              });
              setDisableScroll((prev) => {
                if (!prev) {
                  timer = setTimeout(() => {
                    setDisableScroll(false);
                  }, 1000);
                }
                return true;
              });
            }
          }
        });
      },
      { threshold: 0.0, rootMargin: "-350px 0px" },
    );

    if (bottom) {
      observer.observe(bottom);
    }

    return () => {
      if (bottom) {
        observer.unobserve(bottom);
      }

      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  return (
    <>
      <div className="flex w-full justify-center gap-3 max-md:flex-col-reverse max-md:items-center">
        <div
          className={clsx(
            "flex w-full max-w-[50%] flex-col gap-10 text-left max-md:max-w-full",
            disableScroll ? "overflow-hidden" : "overflow-auto",
          )}
          style={{
            height: "calc(100vh - 1rem)",
          }}
          ref={scrollSectionRef}
        >
          {summaries[selected]?.summaries.map((summary) => {
            return <p key={summary.blockId}>{summary.summary.content}</p>;
          })}
          <div ref={bottomRef}></div>
          <div className="min-h-[500px]"></div>
        </div>
        <Separator.Root orientation="vertical" className="w-px bg-red-700" />
        <div className="flex w-full max-w-[50%] flex-col gap-4 max-md:max-w-full">
          <div>
            <YoutubeEmbed embedId={videoUrls[selected]} />
          </div>
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
        </div>
      </div>
    </>
  );
};

export default VideoDisplay;
