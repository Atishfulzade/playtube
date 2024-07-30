import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { leftSidebar, sidebarMobileMenu } from "../utils/constant";

const LeftSidebar = () => {
  const navigate = useNavigate();
  // State to track if the view is desktop or mobile
  const [desktopView, setDesktopView] = useState(window.innerWidth > 480);
  // State to track the active sidebar item
  const [isActive, setIsActive] = useState("Home");
  const [isIconActive, setIsIconActive] = useState("Home");

  // Effect to handle window resize
  useEffect(() => {
    const handleResize = () => {
      setDesktopView(window.innerWidth > 480);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return desktopView ? (
    // Desktop view sidebar
    <div className="px-6  h-full pb-7 bg-white z-50 md:sticky left-0 top-28">
      <div className="mt-[10px] flex flex-col gap-3">
        {leftSidebar.map((item, index) => (
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
      </div>
    </div>
  ) : (
    // Mobile view sidebar
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
  );
};

export default LeftSidebar;
