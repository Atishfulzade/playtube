import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  exploreMenu,
  leftSidebarMenu1,
  leftSidebarMenu2,
  sidebarMobileMenu,
} from "../utils/constant";

const LeftSidebar = () => {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.windowSize.isMobile);
  const [isActive, setIsActive] = useState("Home");
  const [isIconActive, setIsIconActive] = useState("Home");

  return isMobile ? (
    <div className="fixed left-0 z-50 bottom-0 bg-slate-100 py-1 flex items-center justify-around w-[100%]">
      {sidebarMobileMenu.map((item, index) => (
        <div
          key={index}
          className={`w-[40px] h-[40px] flex items-center text-center justify-center ${
            isIconActive === item.name
              ? "bg-slate-800 text-white  rounded-full"
              : "bg-slate-100"
          }`}
          onClick={() => {
            setIsIconActive(item.name);
            navigate(item.path);
          }}
        >
          {item.icon}
        </div>
      ))}
    </div>
  ) : (
    // Desktop view sidebar
    <div className="px-6 leftbar w-[%] h-[89vh] overflow-y-scroll pb-7  z-50 sticky left-0 top-16">
      <div className=" leftbar flex flex-col gap-3">
        {leftSidebarMenu1.map((item, index) => (
          <div
            key={index}
            className={`flex cursor-pointer py-2 px-3 rounded-[10px] ${
              isActive === item.title ? "bg-slate-200" : "bg-white"
            }`}
            onClick={() => {
              setIsActive(item.title);
              navigate(item.path);
            }}
          >
            {item.icon}
            <p className="ml-[20px] whitespace-nowrap">{item.title}</p>
          </div>
        ))}
        <span className="h-[1px] w-full bg-slate-300"></span>
        {leftSidebarMenu2.map((item, index) => (
          <div
            key={index}
            className={`flex cursor-pointer py-2 px-3 rounded-[10px] ${
              isActive === item.title ? "bg-slate-200" : "bg-white"
            }`}
            onClick={() => {
              setIsActive(item.title);
              navigate(item.path);
            }}
          >
            {item.icon}
            <p className="ml-[20px] whitespace-nowrap">{item.title}</p>
          </div>
        ))}
        <span className="h-[1px] w-full bg-slate-300"></span>
        <h3>Explore</h3>
        {exploreMenu.map((item, index) => (
          <div
            key={index}
            className={`flex cursor-pointer py-2 px-3 rounded-[10px] ${
              isActive === item.title ? "bg-slate-200" : "bg-white"
            }`}
            onClick={() => {
              setIsActive(item.title);
              navigate(item.path);
            }}
          >
            {item.icon}
            <p className="ml-[20px] whitespace-nowrap">{item.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;
