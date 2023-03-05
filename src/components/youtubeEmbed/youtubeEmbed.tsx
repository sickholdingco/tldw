import { useState } from "react";

const YoutubeEmbed = ({ embedId }: { embedId: string | undefined }) => {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = () => {
    setLoaded(true);
  };

  if (!embedId) return null;

  return (
    <div className="video-responsive">
      <iframe
        src={`https://www.youtube.com/embed/${embedId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
        className="aspect-video w-full"
        style={{ visibility: loaded ? "visible" : "hidden" }}
        onLoad={handleLoad}
      />
    </div>
  );
};

export default YoutubeEmbed;
