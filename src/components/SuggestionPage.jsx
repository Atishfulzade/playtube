import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";
import { fetchData } from "../utils/FetchData";

const SuggestionPage = ({ input, isOpen, setIsOpen, setInput }) => {
  const isMobile = useSelector((state) => state.windowSize.isMobile);
  const language = useSelector((state) => state.loggedStatus.language);
  const country = useSelector((state) => state.loggedStatus.country);
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetchData(
          `auto-complete/?q=${input}&hl=${convertLanguage(
            language
          )}&gl=${convertCountryIntoCode(country)}`
        );
        setSuggestions(response?.results || []);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    if (input) {
      fetchVideos();
    }
  }, [input, language, country]);

  return (
    <div
      className={`absolute top-0 h-fit p-3 bg-white dark:bg-slate-800 dark:text-white border rounded-lg w-full z-50 ${
        isMobile ? "right-0" : "md:mt-12"
      }`}
    >
      {isMobile && isOpen && (
        <div className="w-full flex justify-center">
          <div className="flex mx-auto mt-5 w-[90%] bg-white border rounded-full overflow-hidden relative">
            <input
              type="text"
              value={input}
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
              className="w-[90%] text-base outline-none border text-slate-800 indent-5 md:w-[500px] md:h-[40px] rounded-tl-full rounded-bl-full"
            />
            <button
              type="submit"
              className={`flex items-center justify-center h-[40px] w-[40px] md:w-[48px] ${
                isMobile ? "border-none text-xl" : "border border-slate-300"
              } rounded-full md:rounded-l-none`}
            >
              <FiSearch />
            </button>
          </div>
        </div>
      )}
      <div className="py-1 px-3 w-full flex flex-col gap-2">
        {isMobile && (
          <div className="flex w-full justify-end cursor-pointer">
            <MdOutlineClose
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl rounded-md p-1"
            />
          </div>
        )}
        <div className="flex flex-col w-full gap-2 overflow-y-auto h-[300px] md:h-[200px]">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => {
                navigate(`/search/${suggestion}`);
                setInput("");
                setIsOpen(false); // Close the suggestions on selection
              }}
              className="px-2 py-2 rounded-sm text-sm md:text-[18px] cursor-pointer hover:bg-slate-700 dark:text-slate-100"
            >
              {suggestion}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestionPage;
