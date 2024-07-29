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
    <div className="w-full flex h-10 justify-between items-center px-2">
      <div
        ref={scrollRef}
        className="w-[97%] flex  gap-3 item-center overflow-x-auto"
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
        className="self-center active:bg-slate-200 text-xl transition-all hover:bg-slate-100 h-8 w-8 p-2 rounded-full cursor-pointer"
      />
    </div>
  );
};

export default CategoryBar;
