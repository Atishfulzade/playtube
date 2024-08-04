import React from "react";
import VideoCard from "./VideoCard";

const Videos = ({ isHorizantal, videoData, setWatchLater, flex }) => {
  return (
    <div
      className={`flex  ${
        isHorizantal ? `flex-col ${flex} items-start` : `flex-wrap ${flex}`
      } h-full w-full gap-4`}
    >
      {videoData?.map((item, i) => (
        <VideoCard
          key={i}
          isHorizantal={isHorizantal}
          item={item}
          setWatchLater={setWatchLater}
        />
      ))}
    </div>
  );
};

export default Videos;
