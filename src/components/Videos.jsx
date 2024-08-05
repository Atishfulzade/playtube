import React from "react";
import VideoCard from "./VideoCard";

/**
 * Videos component displays a list of VideoCard components.
 * @param {Object} props - The component props
 * @param {boolean} props.isHorizantal - Determines if the layout is horizontal
 * @param {Array} props.videoData - Array of video data to display
 * @param {string} props.flex - Additional CSS classes for flex layout
 * @param {boolean} props.add - Flag to determine if the card is for adding to watch later
 */
const Videos = ({ isHorizantal, videoData, flex, add }) => {
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
