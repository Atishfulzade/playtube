import React, { useEffect, useState } from "react";
import { Loader, Videos } from "../components";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/FetchData";
import { useSelector } from "react-redux";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";
const SearchFeed = () => {
  const { searchTerm } = useParams();
  const language = useSelector((state) => state.loggedStatus.language);
  const location = useSelector((state) => state.loggedStatus.country);
  const [SearchVideos, setSearchVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetchData(
          `search/?q=${searchTerm}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(location)}`
        );
        setSearchVideos(response?.contents);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, [searchTerm, language, location]);
  if (!SearchVideos) {
    return <Loader />;
  }
  return (
    <div className="md:ps-5">
      <h4 className="md:my-2 m-2 font-semibold text-slate-700 whitespace-nowrap text-xl">
        Search result for:{" "}
        <span className="text-red-600 mb-3">{searchTerm}</span>
      </h4>

      <Videos isHorizantal={true} videoData={SearchVideos} />
    </div>
  );
};

export default SearchFeed;
