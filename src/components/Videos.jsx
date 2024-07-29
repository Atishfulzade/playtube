import React from "react";
import VideoCard from "./VideoCard";
const Videos = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-center md:justify-start">
      {Array(20)
        .fill("")
        .map((_, i) => (
          <VideoCard key={i} />
        ))}
    </div>
  );
};

export default Videos;
