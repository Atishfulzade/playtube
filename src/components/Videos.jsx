import React from "react";
import VideoCard from "./VideoCard";
const Videos = ({ isHorizantal }) => {
  return (
    <div
      className={`flex flex-wrap  ${
        isHorizantal ? "flex-col" : "flex-row"
      } gap-4 justify-center md:justify-start`}
    >
      {Array(20)
        .fill("")
        .map((_, i) => (
          <VideoCard key={i} isHorizantal={isHorizantal} />
        ))}
    </div>
  );
};

export default Videos;
