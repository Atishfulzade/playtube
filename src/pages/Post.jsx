import React, { useEffect } from "react";
import { fetchData } from "../utils/FetchData";

const Post = () => {
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
  }, []);
  return <div>Post</div>;
};

export default Post;
