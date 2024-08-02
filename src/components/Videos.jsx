import React from "react";
import VideoCard from "./VideoCard";
const Videos = ({ isHorizantal, videoData }) => {
  return (
    <div
      className={`flex flex-wrap  ${
        isHorizantal ? "flex-col" : "flex-row"
      } gap-4 justify-center md:justify-start`}
    >
      {videoData?.map((item, i) => (
        <VideoCard key={i} isHorizantal={isHorizantal} item={item} />
      ))}
    </div>
  );
};

export default Videos;
