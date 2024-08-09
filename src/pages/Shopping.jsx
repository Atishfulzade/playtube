import React, { useEffect, useState } from "react";
import { fetchData } from "../utils/FetchData";
import { Videos } from "../components";

const Shopping = () => {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetchData(`search/?q=shopping&hl=en&gl=US`);
        setVideoData(response.contents);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, []);
  return (
    <div className="flex flex-col dark:bg-slate-800 dark:text-white w-full justify-center items-center">
      {/* Display videos */}
      <Videos isHorizantal={false} videoData={videoData} add={true} />
    </div>
  );
};

export default Shopping;
