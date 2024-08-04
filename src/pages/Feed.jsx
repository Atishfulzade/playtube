import React, { useEffect, useState } from "react";
import { CategoryBar, Loader, Videos } from "../components";
import { useSelector } from "react-redux";
import { fetchData } from "../utils/FetchData";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";

const Feed = ({ setLeftSideBarOpen }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videoData, setVideoData] = useState([]);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);

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

  const fetchMoreVideos = async () => {
    if (loadingMore || !nextPageToken) return;

    setLoadingMore(true);
    try {
      const response = await fetchData(
        `search/?q=${selectedCategory}&pageToken=${nextPageToken}&hl=${convertLanguage(
          language
        )}&gl=${convertCountryIntoCode(location)}`
      );
      setVideoData((previousVideo) => [
        ...previousVideo,
        ...(response?.contents || []),
      ]);
      setNextPageToken(response?.nextPageToken || null);
    } catch (error) {
      console.error("Error fetching more video data:", error.message);
    } finally {
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

  if (loading && videoData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col w-full justify-center items-center">
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <Videos isHorizantal={false} videoData={videoData} add={true} />
      {loadingMore && <Loader />}
    </div>
  );
};

export default Feed;
