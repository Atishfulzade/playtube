import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";

function SettingSidebarOption({
  heading,
  arrData,
  selectOption,
  setSelectOption,
  setIsSettingSidebar,
}) {
  const [visible, setVisible] = useState(true);

  const handleOptionClick = (option) => {
    setSelectOption(option);
    setVisible(false);
    setIsSettingSidebar(true);

    if (heading === "Appearance") {
      if (option === "Dark theme") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  };

  return (
    <div
      className={`top-14 md:right-14 w-64 absolute ${
        visible ? "block" : "hidden"
      } right-5 bg-white dark:bg-gray-800 dark:text-white shadow shadow-slate-400 rounded-md`}
    >
      <div className="flex items-center px-3 py-2 border-b-[1px]">
        <IoMdArrowBack
          size="24"
          className="cursor-pointer hover:bg-slate-200 text-sm md:text-xl p-1 rounded-full"
          onClick={() => {
            setVisible(false);
            setIsSettingSidebar(true);
          }}
        />
        <p className="ml-[10px] text-[18px]">{heading}</p>
      </div>
      {heading === "Appearance" && (
        <div className="px-3 py-2 text-slate-600 dark:text-slate-400 text-[14px]">
          Setting applies to this browser only
        </div>
      )}
      <div className="cursor-pointer h-[300px] md:h-fit md:max-h-[600px] overflow-y-auto">
        {arrData.map((item, index) => (
          <div
            className={`flex items-center py-2 px-3 ${
              item === selectOption ? "bg-slate-200 dark:bg-slate-700" : ""
            }`}
            key={index}
            onClick={() => handleOptionClick(item.name)}
          >
            {item.name === selectOption ? (
              <IoCheckmarkSharp />
            ) : (
              <div className="pl-[15px]"></div>
            )}
            <p className="ml-[20px]">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingSidebarOption;
