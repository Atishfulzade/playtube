import React, { useRef, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { categories } from "../utils/constant";

const CategoryBar = () => {
  const scrollRef = useRef(null);
  const forwardCategory = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="md:w-[84%]  relative  md:ms-64 bg-transparent flex h-10 select-none justify-between items-center px-2">
      <div
        ref={scrollRef}
        className="w-[100%] flex  gap-3 categorybar item-center overflow-x-auto"
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className={`px-4 md:py-2 py-1 cursor-pointer h-fit whitespace-nowrap text-sm ${
              selectedCategory === category
                ? "bg-slate-900 text-white"
                : "bg-slate-200 text-slate-900"
            } rounded-[5px] font-semibold`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
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
