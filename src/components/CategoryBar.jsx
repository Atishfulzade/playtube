import React, { useRef } from "react";
import { BsChevronRight } from "react-icons/bs";
import { categories } from "../utils/constant";

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const scrollRef = useRef(null); // Reference to the scrollable category bar

  // Function to scroll the category bar to the right
  const forwardCategory = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="md:w-full dark:bg-slate-800 dark:text-white z-10 w-[95%] mx-auto sticky top-[63px] md:top-[64px] bg-white flex h-12 select-none justify-between items-center py-5">
      <div
        ref={scrollRef}
        className="flex w-[100%] gap-3 categorybar dark:bg-slate-800 dark:text-white items-center overflow-x-auto"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`px-4 md:py-2 py-1 cursor-pointer h-fit whitespace-nowrap text-sm ${
              selectedCategory === category.name
                ? "bg-slate-900 text-white"
                : "bg-slate-200 dark:bg-slate-700 dark:text-white text-slate-900"
            } rounded-[5px] font-semibold`}
            onClick={() => setSelectedCategory(category.name)} // Update selected category on click
          >
            {category.name}
          </div>
        ))}
      </div>
      <BsChevronRight
        onClick={forwardCategory} // Scroll category bar to the right on click
        className="self-center text-xl h-9 md:w-10 w-7 transition-all z-50 p-2 cursor-pointer"
      />
    </div>
  );
};

export default CategoryBar;
