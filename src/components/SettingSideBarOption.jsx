import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { IoCheckmarkSharp } from "react-icons/io5";

function SettingSidebarOption({
  heading,
  arrData,
  setIsSettingSidebar,
  selectOption,
  setSelectOption,
}) {
  const [visible, setVisible] = useState(true);

  return (
    <div
      className={` top-14  md:right-14 w-64 absolute ${
        visible ? "block" : "hidden"
      }  
       right-5 bg-white shadow shadow-slate-400 rounded-md`}
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
        <div className="px-3 py-2 text-slate-600  text-[14px]">
          Setting applies to this browser only
        </div>
      )}
      <div className="cursor-pointer h-[300px] md:h-fit md:max-h-[600px] overflow-y-auto">
        {arrData.map((item, index) => (
          <div
            className={`flex items-center py-2 px-3 `}
            key={index}
            onClick={() => setSelectOption(item)}
          >
            {item === selectOption ? (
              <IoCheckmarkSharp />
            ) : (
              <div className="pl-[15px]"></div>
            )}
            <p className="ml-[20px]">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SettingSidebarOption;
