import React, { useEffect, useState } from "react";
import { CategoryBar, Loader, Videos } from "../components";
import { useSelector } from "react-redux";
import { fetchData } from "../utils/FetchData";

import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";
const Feed = ({ setLeftSideBarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoData, setVideoData] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);
  const [watchLater, setWatchLater] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      setLeftSideBarOpen(true);
      setLoading(true);
      try {
        const response = await fetchData(
          `search/?q=${selectedCategory}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(location)}`
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
  }, [selectedCategory, language, location]);
  console.log(watchLater);

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
      className="flex flex-col w-full justify-center items-center
    "
    >
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Videos
        isHorizantal={false}
        videoData={videoData}
        setWatchLater={setWatchLater}
      />
      {loadingMore && <Loader />}
    </div>
  );
};

export default Feed;
