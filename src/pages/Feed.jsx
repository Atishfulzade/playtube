import React, { useEffect, useState } from "react";
import { CategoryBar, Loader, Videos } from "../components";
import { fetchData } from "../utils/FetchData";
const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoData, setVideoData] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      try {
        const response = await fetchData(
          `search/?q=${selectedCategory}&hl=en&gl=US`
        );
        setVideoData(response?.contents);
        setNextPageToken(response?.nextPageToken);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory]);

  const fetchMoreVideos = async () => {
    if (loadingMore || !nextPageToken) return;
    try {
      setLoadingMore(true);
      const response = await fetchData(
        `search/?q=${selectedCategory}&pageToken=${nextPageToken}&hl=en&gl=US`
      );
      setVideoData((previousVideo) => [
        ...previousVideo,
        ...response?.contents,
      ]);
      setNextPageToken(response?.nextPageToken);
      setLoadingMore(false);
    } catch (error) {
      console.error("Error fetching more video data:", error.message);
      setLoadingMore(false);
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 200
      ) {
        fetchMoreVideos();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [nextPageToken, loadingMore]);

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
      {loadingMore && <Loader />}
    </div>
  );
};

export default Feed;
