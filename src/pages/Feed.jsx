import React, { useEffect, useState } from "react";
import { CategoryBar, Loader, Videos } from "../components";
import { useSelector } from "react-redux";
import { fetchData } from "../utils/FetchData";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";

const Feed = ({ setLeftSideBarOpen }) => {
  // State variables for managing category selection, video data, pagination, and loading states
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoData, setVideoData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Get language and location from Redux store
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);

  // Fetch videos when category, language, or location changes
  useEffect(() => {
    const fetchVideos = async () => {
      setLeftSideBarOpen(true);
      setLoading(true);
      try {
        // Fetch initial videos based on selected category, language, and location
        const response = await fetchData(
          `search/?q=${selectedCategory}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(location)}`
        );
        setVideoData(response?.contents || []);
        setNextPageToken(response?.nextPageToken || null);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [selectedCategory, language, location, setLeftSideBarOpen]);

  // Fetch more videos when scrolling near the bottom of the page
  const fetchMoreVideos = async () => {
    if (loadingMore || !nextPageToken) return;

    setLoadingMore(true);
    try {
      const response = await fetchData(
        `search/?q=${selectedCategory}&pageToken=${nextPageToken}&hl=${convertLanguage(
          language
        )}&gl=${convertCountryIntoCode(location)}`
      );
      setVideoData((previousVideos) => [
        ...previousVideos,
        ...(response?.contents || []),
      ]);
      setNextPageToken(response?.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching more video data:", error.message);
    } finally {
      setLoadingMore(false);
    }
  };

  // Handle scroll events to load more videos when reaching the bottom of the page
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

  // Show loader while data is being fetched
  if (loading && videoData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col dark:bg-slate-800 dark:text-white w-full justify-center items-center">
      {/* Category selection bar */}
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* Display videos */}
      <Videos isHorizantal={false} videoData={videoData} add={true} />
      {/* Loader for additional videos while scrolling */}
      {loadingMore && <Loader />}
    </div>
  );
};

export default Feed;
