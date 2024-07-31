import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { SlGlobe } from "react-icons/sl";
import { PiSignIn } from "react-icons/pi";
import { GoMoon } from "react-icons/go";
import { IoLanguageOutline } from "react-icons/io5";
import { LiaAngleRightSolid } from "react-icons/lia";
import SettingSidebarOption from "./SettingSideBarOption";
function SettingSidebar({ settingCardRef }) {
  const [appearance, setAppearance] = useState("Use device theme");
  const [language, setLanguage] = useState("English");
  const [location, setLocation] = useState("India");

  const [isSettingSidebar, setIsSettingSidebar] = useState(true);

  const settingSidebarData = [
    { id: 1, icon: <FcGoogle size="22" />, name: "Google Account" },
    { id: 2, icon: <PiSignIn size="22" />, name: "Sign out" },
    { id: 3, icon: <GoMoon size="22" />, name: `Appearance: ${appearance}` },
    {
      id: 4,
      icon: <IoLanguageOutline size="22" />,
      name: `Language: ${language}`,
    },
    { id: 5, icon: <SlGlobe size="22" />, name: `Location: ${location}` },
  ];

  const [settingOptionsId, setSettingOptionsId] = useState(1);

  function settingSidebarMenu(id) {
    setSettingOptionsId(id);
    setIsSettingSidebar(false);
  }

  return (
    <>
      <div
        ref={settingCardRef}
        className={`w-fit  absolute top-12 py-3 ${
          isSettingSidebar ? "block" : "hidden"
        } right-5 bg-white shadow shadow-slate-400 rounded-md`}
      >
        <div className="flex cursor-pointer items-center px-3 py-2 border-b-[1px]">
          <img
            src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"
            alt="user avatar"
            className="w-[56px] h-[56px] rounded-full"
          />
          <p className="ml-[10px] text-[18px]">User Name</p>
        </div>
        <div className="">
          {settingSidebarData.map((item) => (
            <div
              className={`flex items-center cursor-pointer hover:bg-slate-200 py-2 px-3 ${
                item.id === 2 ? "border-b-[1px]" : ""
              } `}
              key={item.id}
              onClick={() => settingSidebarMenu(item.id)}
            >
              {item.icon}
              <p className="ml-[20px] cursor-pointer">{item.name}</p>
              <p className="ml-auto cursor-pointer">
                {item.id === 3 && <LiaAngleRightSolid />}
                {item.id === 4 && <LiaAngleRightSolid />}
                {item.id === 5 && <LiaAngleRightSolid />}
              </p>
            </div>
          ))}
        </div>
      </div>

      {settingOptionsId === 3 && (
        <SettingSidebarOption
          heading={"Appearance"}
          arrData={["Use device theme", "Dark theme", "Light theme"]}
          setIsSettingSidebar={setIsSettingSidebar}
          selectOption={appearance}
          setSelectOption={setAppearance}
        />
      )}
      {settingOptionsId === 4 && (
        <SettingSidebarOption
          heading={"Choose your language"}
          arrData={[
            "English",
            "French",
            "German",
            "Spanish",
            "Hindi",
            "Marathi",
            "Tamil",
          ]}
          setIsSettingSidebar={setIsSettingSidebar}
          selectOption={language}
          setSelectOption={setLanguage}
        />
      )}
      {settingOptionsId === 5 && (
        <SettingSidebarOption
          heading={"Choose your location"}
          arrData={[
            "India",
            "Germany",
            "USA",
            "Canada",
            "France",
            "Bangladesh",
            "Sri Lanka",
            "Bhutan",
            "Pakistan",
            "Afghanistan",
            "Russia",
            "Myanmaar",
            "China",
            "Australia",
            "Great Britain",
            "Ireland",
            "Italy",
            "Turkey",
            "Egypt",
            "South Africa",
          ].sort()}
          setIsSettingSidebar={setIsSettingSidebar}
          selectOption={location}
          setSelectOption={setLocation}
        />
      )}
    </>
  );
}

export default SettingSidebar;
