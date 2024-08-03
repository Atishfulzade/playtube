import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FiSearch } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { convertLanguage } from "../utils/convertLanguage";
import { convertCountryIntoCode } from "../utils/convertCountry";
import { fetchData } from "../utils/FetchData";
const MobileSuggestion = ({ input, isOpen, setIsOpen, setInput }) => {
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
        setSuggestions(response?.results);
      } catch (error) {
        console.error("Error fetching video data:", error.message);
      }
    };

    fetchVideos();
  }, [input]);
  console.log(suggestions);

  return (
    <div
      className={` absolute  md:mt-12 top-0 h-fit p-3 justify-center bg-white w-full gap-1 items-start flex ${
        isMobile && "right-0"
      } flex-col   border  rounded-lg z-50`}
    >
      {isMobile && isOpen && (
        <div className="w-full  flex justify-center ">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex mx-auto mt-5 w-[90%] bg-white border rounded-full overflow-hidden  relative"
          >
            <input
              type="text"
              value={input}
              placeholder="Search"
              onChange={(e) => setInput(e.target.value)}
              className="md:block w-[90%] text-base outline-none   text-slate-800 indent-5 md:w-[500px] md:h-[40px] md:outline-none md:border md:border-slate-300 md:border-r-0 md:rounded-tl-full md:rounded-bl-full"
            />
            <button
              type="submit"
              className={`flex items-center justify-center text-slate-700  h-[40px] w-[40px] md:w-[48px] ${
                isMobile ? "border-none text-xl" : "border border-slate-300"
              } rounded-full md:rounded-l-none`}
            >
              <FiSearch />
            </button>
          </form>
        </div>
      )}
      <div className="p-3  gap-1 items-start flex flex-col  top-14  ">
        <div className="flex w-full cursor-pointer  justify-end">
          {isMobile ? (
            <MdOutlineClose
              onClick={() => setIsOpen(!isOpen)}
              className="absolute top-1 right-2 p-1 text-2xl rounded-md "
            />
          ) : (
            ""
          )}
        </div>
        <div className="flex flex-col w-full  overflow-y-auto h-fit md:h-[200px]">
          {suggestions.map((keys) => (
            <div
              key={keys.id}
              onClick={() => {
                navigate(`/search/${keys}`);
                setInput("");
                setIsOpen(!isOpen);
              }}
              className="px-2  py-2 rounded-sm md:text-[18px] text-sm leading-3  cursor-pointer w-full hover:bg-slate-100"
            >
              {keys}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileSuggestion;
