import React, { useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { categories } from "../utils/constant";

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  const scrollRef = useRef(null);
  const forwardCategory = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="md:w-full z-10 w-[95%] mx-auto  sticky top-[63px] md:top-[64px]   bg-white  flex h-12 select-none justify-between items-center py-5">
      <div
        ref={scrollRef}
        className=" flex w-[100%] gap-3 categorybar item-center overflow-x-auto"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`px-4 md:py-2 py-1 cursor-pointer h-fit whitespace-nowrap text-sm ${
              selectedCategory === category.name
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-900"
            } rounded-[5px] font-semibold`}
            onClick={() => setSelectedCategory(category.query)}
          >
            {category.name}
          </div>
        ))}
      </div>

      <BsChevronRight
        onClick={forwardCategory}
        className="self-center   text-xl  h-9  md:w-10 w-7 transition-all z-50  p-2  cursor-pointer"
      />
    </div>
  );
};

export default CategoryBar;
