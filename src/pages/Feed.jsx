import React, { useEffect, useState } from "react";
import { CategoryBar, Loader, Videos } from "../components";
import { fetchData } from "../utils/FetchData";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetchData(
          `search/?q=${selectedCategory}&hl=en&gl=US`
        );
        setVideoData(response.contents);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, [selectedCategory]);
  console.log(videoData);
  if (!videoData) {
    return <Loader />;
  }
  return (
    <div
      className="flex flex-col w-full   justify-center   items-center
    "
    >
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Videos isHorizantal={false} videoData={videoData} />
    </div>
  );
};

export default Feed;
