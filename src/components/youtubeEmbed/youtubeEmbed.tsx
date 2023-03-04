import { useRef } from "react";

const youtubeEmbed = ({ embedId }: { embedId: string }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="video-responsive">
      <iframe
        ref={iframeRef}
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="aspect-video w-full"
        style={{ visibility: "hidden" }}
        onLoad={() => {
          if (iframeRef.current) {
            iframeRef.current.style.visibility = "visible";
          }
        }}
      />
    </div>
  );
};

export default youtubeEmbed;
