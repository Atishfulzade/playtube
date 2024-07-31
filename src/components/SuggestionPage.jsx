import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./SearchBar";
import { MdOutlineClose } from "react-icons/md";

const SuggestionPage = ({ input, isOpen, setIsOpen }) => {
  const isMobile = useSelector((state) => state.windowSize.isMobile);
  const Suggestion = [
    { id: 1, title: "Comedy ka joker" },
    { id: 2, title: "Comedy ka home" },
    { id: 3, title: "Comedy ka as" },
  ];
  return (
    <div>
      {isMobile && isOpen ? <SearchBar input={input} /> : ""}

      <div className="absolute min-h[300px] p-3 h-[500px] overflow-y-auto w-[600px] gap-1 items-start flex flex-col bg-white top-14 right-96 border rounded-lg z-50">
        <div className="flex w-full cursor-pointer  justify-end">
          {isMobile ? (
            <MdOutlineClose
              onClick={() => setIsOpen(false)}
              className="hover:bg-slate-100 p-1 text-2xl rounded-md "
            />
          ) : (
            ""
          )}
        </div>
        {Suggestion.map((suggestion) => (
          <div
            key={suggestion.id}
            className="px-2 py-2 rounded-sm md:text-[20px] text-sm leading-3 font-semibold cursor-pointer w-full hover:bg-slate-100"
          >
            {suggestion.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestionPage;
