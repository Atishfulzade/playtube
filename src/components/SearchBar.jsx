import React from "react";
import { FiSearch } from "react-icons/fi";
const SearchBar = ({ setInput, input }) => {
  return (
    <>
      <input
        type="text"
        value={input}
        placeholder="Search"
        onChange={(e) => setInput(e.target.value)}
        className=" hidden md:block text-base text-slate-800 indent-5 md:w-[500px] md:h-[40px] md:outline-none md:border md:border-slate-300 md:border-r-0 md:rounded-tl-full md:rounded-bl-full"
      />
      <button className="flex items-center justify-center text-slate-700 border h-[40px] w-[40px] md:w-[48px] border-slate-300 rounded-full md:rounded-l-none  ">
        <FiSearch className="text-[20px]" />
      </button>
    </>
  );
};

export default SearchBar;
