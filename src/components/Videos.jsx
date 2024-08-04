import React from "react";
import VideoCard from "./VideoCard";

const Videos = ({ isHorizantal, videoData, setWatchLater, flex, add }) => {
  return (
    <div
      className={`flex dark:bg-slate-800 dark:text-white ${
        isHorizantal
          ? `flex-col ${flex} items-start`
          : `flex-wrap ${flex} justify-center`
      } h-full w-full gap-4`}
    >
      {videoData?.map((item, i) => (
        <VideoCard key={i} isHorizantal={isHorizantal} item={item} add={add} />
      ))}
    </div>
  );
};

export default Videos;
