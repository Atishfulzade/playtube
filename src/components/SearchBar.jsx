import React from "react";
import { FiSearch } from "react-icons/fi";
import SuggestionPage from "./SuggestionPage";
import { useSelector } from "react-redux";
useSelector;
const SearchBar = ({ setInput, input, isOpen, setIsOpen }) => {
  const isMobile = useSelector((state) => state.windowSize.isMobile);
  return (
    <div className="relative w-full ">
      <form className="flex  relative" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={input}
          placeholder="Search"
          onChange={(e) => setInput(e.target.value)}
          className=" hidden md:block text-base text-slate-800 indent-5 md:w-[500px] md:h-[40px] md:outline-none md:border md:border-slate-300 md:border-r-0 md:rounded-tl-full md:rounded-bl-full"
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
      {input.length > 0 && !isMobile && (
        <SuggestionPage
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setInput={setInput}
          input={input}
        />
      )}
    </div>
  );
};

export default SearchBar;
